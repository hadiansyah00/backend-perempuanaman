const express = require('express');
const router = express.Router();
const { Capaian, CapaianRow, sequelize } = require('../models');
const authenticate = require('../middleware/auth');
const authorize = require('../middleware/role');

// GET /api/capaian -> Get all Capaian with rows
router.get('/', async (req, res) => {
  try {
    const capaian = await Capaian.findAll({
      include: [
        { model: CapaianRow, as: 'rows' }
      ],
      order: [
        ['id', 'ASC'],
        [{ model: CapaianRow, as: 'rows' }, 'sortOrder', 'ASC']
      ]
    });
    return res.json({ data: capaian });
  } catch (error) {
    console.error('Fetch capaian error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/capaian/:id -> Get single Capaian
router.get('/:id', async (req, res) => {
  try {
    const capaian = await Capaian.findByPk(req.params.id, {
      include: [
        { model: CapaianRow, as: 'rows' }
      ],
      order: [
        [{ model: CapaianRow, as: 'rows' }, 'sortOrder', 'ASC']
      ]
    });
    if (!capaian) return res.status(404).json({ error: 'Data tidak ditemukan' });
    return res.json({ data: capaian });
  } catch (error) {
    console.error('Fetch single capaian error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Admin routes below
router.use(authenticate);
router.use(authorize('super_admin', 'admin', 'writer'));

// POST /api/capaian -> Create Capaian
router.post('/', async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { title, description, headers, rows } = req.body;
    
    const capaian = await Capaian.create(
      { title, description, headers },
      { transaction: t }
    );

    if (rows && Array.isArray(rows)) {
      const rowPromises = rows.map((row, idx) => {
        return CapaianRow.create({
          capaianId: capaian.id,
          sortOrder: idx,
          data: row.data || row // Handle both flat arrays or object with data
        }, { transaction: t });
      });
      await Promise.all(rowPromises);
    }

    await t.commit();
    return res.status(201).json({ message: 'Capaian created', data: capaian });
  } catch (error) {
    await t.rollback();
    console.error('Create capaian error:', error);
    return res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// PUT /api/capaian/:id -> Transactionally update Capaian and perfectly replace rows
router.put('/:id', async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const capaian = await Capaian.findByPk(req.params.id);
    if (!capaian) {
      await t.rollback();
      return res.status(404).json({ error: 'Data tidak ditemukan' });
    }

    const { title, description, headers, rows } = req.body;
    await capaian.update({ title, description, headers }, { transaction: t });

    if (rows !== undefined) {
      // Re-create all rows
      await CapaianRow.destroy({ where: { capaianId: capaian.id }, transaction: t });
      if (Array.isArray(rows) && rows.length > 0) {
        const rowPromises = rows.map((row, idx) => {
          return CapaianRow.create({
            capaianId: capaian.id,
            sortOrder: idx,
            data: row.data || row
          }, { transaction: t });
        });
        await Promise.all(rowPromises);
      }
    }

    await t.commit();
    
    // Fetch updated data to send
    const updatedData = await Capaian.findByPk(capaian.id, {
      include: [{ model: CapaianRow, as: 'rows' }],
      order: [[{ model: CapaianRow, as: 'rows' }, 'sortOrder', 'ASC']]
    });
    
    return res.json({ message: 'Capaian updated', data: updatedData });
  } catch (error) {
    await t.rollback();
    console.error('Update capaian error:', error);
    return res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// DELETE /api/capaian/:id -> Delete Capaian
router.delete('/:id', authorize('super_admin', 'admin'), async (req, res) => {
  try {
    const capaian = await Capaian.findByPk(req.params.id);
    if (!capaian) return res.status(404).json({ error: 'Data tidak ditemukan' });

    await capaian.destroy(); // CASCADE will handle rows
    return res.json({ message: 'Capaian deleted' });
  } catch (error) {
    console.error('Delete capaian error:', error);
    return res.status(500).json({ error: 'Server error', details: error.message });
  }
});

module.exports = router;
