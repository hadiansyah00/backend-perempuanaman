const express = require('express');
const db = require('../models');
const authenticate = require('../middleware/auth');
const authorize = require('../middleware/role');

const router = express.Router();

// ─── GET /api/heroes ─── (Public)
router.get('/', async (req, res) => {
  try {
    const heroes = await db.Hero.findAll({
      include: [
        { model: db.HeroCtaButton, as: 'ctaButtons', order: [['sortOrder', 'ASC']] },
        { model: db.HeroStat, as: 'stats', order: [['sortOrder', 'ASC']] },
      ],
      order: [['createdAt', 'ASC']],
    });
    res.json({ data: heroes });
  } catch (err) {
    console.error('Get heroes error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ─── GET /api/heroes/:id ─── (Public)
router.get('/:id', async (req, res) => {
  try {
    const hero = await db.Hero.findByPk(req.params.id, {
      include: [
        { model: db.HeroCtaButton, as: 'ctaButtons' },
        { model: db.HeroStat, as: 'stats' },
      ],
    });
    if (!hero) return res.status(404).json({ error: 'Hero tidak ditemukan' });
    res.json({ data: hero });
  } catch (err) {
    console.error('Get hero error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ─── PUT /api/heroes/:id ─── (Admin+)
router.put('/:id', authenticate, authorize('super_admin', 'admin'), async (req, res) => {
  const t = await db.sequelize.transaction();
  try {
    const hero = await db.Hero.findByPk(req.params.id, { transaction: t });
    if (!hero) {
      await t.rollback();
      return res.status(404).json({ error: 'Hero tidak ditemukan' });
    }

    const { ctaButtons, stats, ...heroData } = req.body;

    await hero.update(heroData, { transaction: t });

    // Replace CTA buttons
    if (ctaButtons !== undefined) {
      await db.HeroCtaButton.destroy({ where: { heroId: hero.id }, transaction: t });
      if (ctaButtons && ctaButtons.length > 0) {
        const btnData = ctaButtons.map((btn, i) => ({
          heroId: hero.id,
          label: btn.label,
          href: btn.href,
          sortOrder: i,
        }));
        await db.HeroCtaButton.bulkCreate(btnData, { transaction: t });
      }
    }

    // Replace stats
    if (stats !== undefined) {
      await db.HeroStat.destroy({ where: { heroId: hero.id }, transaction: t });
      if (stats && stats.length > 0) {
        const statData = stats.map((s, i) => ({
          heroId: hero.id,
          value: s.value,
          label: s.label,
          sortOrder: i,
        }));
        await db.HeroStat.bulkCreate(statData, { transaction: t });
      }
    }

    await t.commit();

    // Re-fetch with includes
    const updated = await db.Hero.findByPk(hero.id, {
      include: [
        { model: db.HeroCtaButton, as: 'ctaButtons' },
        { model: db.HeroStat, as: 'stats' },
      ],
    });

    res.json({ data: updated });
  } catch (err) {
    await t.rollback();
    console.error('Update hero error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
