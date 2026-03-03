const express = require('express');
const { Op } = require('sequelize');
const Joi = require('joi');
const db = require('../models');
const authenticate = require('../middleware/auth');
const authorize = require('../middleware/role');
const paginate = require('../utils/pagination');
const generateSlug = require('../utils/generateSlug');

const router = express.Router();

const beritaSchema = Joi.object({
  title: Joi.string().min(5).max(500).required(),
  slug: Joi.string().optional(),
  date: Joi.date().optional(),
  categoryName: Joi.string().allow('', null).optional(),
  excerpt: Joi.string().allow('', null).optional(),
  content: Joi.string().allow('', null).optional(),
  featuredImage: Joi.string().allow('', null).optional(),
  tags: Joi.array().items(Joi.string()).optional(),
});

// ─── GET /api/berita ─── (Public, paginated)
router.get('/', async (req, res) => {
  try {
    const { search, category, tag, page, per_page, sort } = req.query;
    const { limit, offset, getMeta } = paginate(page, per_page || 9);

    const where = {};
    if (search) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { excerpt: { [Op.iLike]: `%${search}%` } },
        { content: { [Op.iLike]: `%${search}%` } },
      ];
    }
    if (category) {
      where.categoryName = category;
    }

    // Build include
    const include = [{ model: db.BeritaTag, as: 'tags' }];

    // Tag filter via subquery
    let tagFilter = {};
    if (tag) {
      const beritaIds = await db.BeritaTag.findAll({
        where: { tag: { [Op.iLike]: `%${tag}%` } },
        attributes: ['beritaId'],
        raw: true,
      });
      where.id = { [Op.in]: beritaIds.map((t) => t.beritaId) };
    }

    const order = [['date', sort === 'asc' ? 'ASC' : 'DESC']];

    const { count, rows } = await db.Berita.findAndCountAll({
      where,
      include,
      order,
      limit,
      offset,
      distinct: true,
    });

    res.json({
      data: rows,
      meta: getMeta(count),
    });
  } catch (err) {
    console.error('Get berita error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ─── GET /api/berita/categories ─── (Public)
router.get('/categories', async (req, res) => {
  try {
    const categories = await db.Berita.findAll({
      attributes: [[db.Sequelize.fn('DISTINCT', db.Sequelize.col('categoryName')), 'categoryName']],
      where: { categoryName: { [Op.not]: null } },
      raw: true,
    });
    res.json({ data: categories.map((c) => c.categoryName).filter(Boolean) });
  } catch (err) {
    console.error('Get categories error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ─── GET /api/berita/tags ─── (Public)
router.get('/tags', async (req, res) => {
  try {
    const tags = await db.BeritaTag.findAll({
      attributes: [[db.Sequelize.fn('DISTINCT', db.Sequelize.col('tag')), 'tag']],
      raw: true,
    });
    res.json({ data: tags.map((t) => t.tag).filter(Boolean) });
  } catch (err) {
    console.error('Get tags error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ─── GET /api/berita/:slug ─── (Public)
router.get('/:slug', async (req, res) => {
  try {
    const berita = await db.Berita.findOne({
      where: { slug: req.params.slug },
      include: [{ model: db.BeritaTag, as: 'tags' }],
    });
    if (!berita) return res.status(404).json({ error: 'Artikel tidak ditemukan' });
    res.json({ data: berita });
  } catch (err) {
    console.error('Get berita detail error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ─── POST /api/berita ─── (Writer+)
router.post('/', authenticate, authorize('super_admin', 'admin', 'writer'), async (req, res) => {
  const t = await db.sequelize.transaction();
  try {
    const { error, value } = beritaSchema.validate(req.body);
    if (error) {
      await t.rollback();
      return res.status(400).json({ error: error.details[0].message });
    }

    const { tags, ...beritaData } = value;

    // Auto-generate slug if not provided
    if (!beritaData.slug) {
      beritaData.slug = generateSlug(beritaData.title);
    }

    // Ensure unique slug
    const existingSlug = await db.Berita.findOne({ where: { slug: beritaData.slug }, transaction: t });
    if (existingSlug) {
      beritaData.slug = beritaData.slug + '-' + Date.now();
    }

    if (!beritaData.date) {
      beritaData.date = new Date();
    }

    const berita = await db.Berita.create(beritaData, { transaction: t });

    if (tags && tags.length > 0) {
      const tagData = tags.map((tag) => ({ beritaId: berita.id, tag }));
      await db.BeritaTag.bulkCreate(tagData, { transaction: t });
    }

    await t.commit();

    const created = await db.Berita.findByPk(berita.id, {
      include: [{ model: db.BeritaTag, as: 'tags' }],
    });

    res.status(201).json({ data: created });
  } catch (err) {
    await t.rollback();
    console.error('Create berita error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ─── PUT /api/berita/:id ─── (Writer+)
router.put('/:id', authenticate, authorize('super_admin', 'admin', 'writer'), async (req, res) => {
  const t = await db.sequelize.transaction();
  try {
    const berita = await db.Berita.findByPk(req.params.id, { transaction: t });
    if (!berita) {
      await t.rollback();
      return res.status(404).json({ error: 'Artikel tidak ditemukan' });
    }

    const { tags, ...beritaData } = req.body;

    // Validate with the same schema as POST (but make title optional for partial updates)
    const updateSchema = Joi.object({
      title: Joi.string().min(5).max(500).optional(),
      slug: Joi.string().optional(),
      date: Joi.date().optional(),
      categoryName: Joi.string().allow('', null).optional(),
      excerpt: Joi.string().allow('', null).optional(),
      content: Joi.string().allow('', null).optional(),
      featuredImage: Joi.string().allow('', null).optional(),
    });

    const { error: validationError, value: validatedData } = updateSchema.validate(beritaData);
    if (validationError) {
      await t.rollback();
      return res.status(400).json({ error: validationError.details[0].message });
    }

    // Regenerate slug if title changed
    if (validatedData.title && validatedData.title !== berita.title && !validatedData.slug) {
      validatedData.slug = generateSlug(validatedData.title);
      const existingSlug = await db.Berita.findOne({
        where: { slug: validatedData.slug, id: { [Op.ne]: berita.id } },
        transaction: t,
      });
      if (existingSlug) {
        validatedData.slug = validatedData.slug + '-' + Date.now();
      }
    }

    await berita.update(validatedData, { transaction: t });

    if (tags !== undefined) {
      await db.BeritaTag.destroy({ where: { beritaId: berita.id }, transaction: t });
      if (tags && tags.length > 0) {
        const tagData = tags.map((tag) => ({ beritaId: berita.id, tag }));
        await db.BeritaTag.bulkCreate(tagData, { transaction: t });
      }
    }

    await t.commit();

    const updated = await db.Berita.findByPk(berita.id, {
      include: [{ model: db.BeritaTag, as: 'tags' }],
    });

    res.json({ data: updated });
  } catch (err) {
    await t.rollback();
    console.error('Update berita error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ─── DELETE /api/berita/:id ─── (Admin+)
router.delete('/:id', authenticate, authorize('super_admin', 'admin'), async (req, res) => {
  try {
    const berita = await db.Berita.findByPk(req.params.id);
    if (!berita) return res.status(404).json({ error: 'Artikel tidak ditemukan' });

    await berita.destroy();
    res.json({ message: 'Artikel berhasil dihapus' });
  } catch (err) {
    console.error('Delete berita error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
