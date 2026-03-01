const express = require('express');
const router = express.Router();
const { Mitra } = require('../models');
const authenticate = require('../middleware/auth');
const authorize = require('../middleware/role');

// GET /api/mitra -> List all ordered by orderStatus
router.get('/', async (req, res) => {
  try {
    const mitra = await Mitra.findAll({
      order: [['orderStatus', 'ASC'], ['id', 'ASC']]
    });
    return res.json({ data: mitra });
  } catch (error) {
    console.error('Fetch mitra error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Admin routes below
router.use(authenticate);
router.use(authorize('super_admin', 'admin', 'writer'));

// POST /api/mitra -> Create
router.post('/', async (req, res) => {
  try {
    const m = await Mitra.create(req.body);
    return res.status(201).json({ message: 'Mitra created', data: m });
  } catch (error) {
    console.error('Create mitra error:', error);
    return res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// PUT /api/mitra/:id -> Update
router.put('/:id', async (req, res) => {
  try {
    const m = await Mitra.findByPk(req.params.id);
    if (!m) return res.status(404).json({ error: 'Data tidak ditemukan' });

    await m.update(req.body);
    return res.json({ message: 'Mitra updated', data: m });
  } catch (error) {
    console.error('Update mitra error:', error);
    return res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// DELETE /api/mitra/:id -> Delete 
router.delete('/:id', authorize('super_admin', 'admin'), async (req, res) => {
  try {
    const m = await Mitra.findByPk(req.params.id);
    if (!m) return res.status(404).json({ error: 'Data tidak ditemukan' });

    await m.destroy();
    return res.json({ message: 'Mitra deleted' });
  } catch (error) {
    console.error('Delete mitra error:', error);
    return res.status(500).json({ error: 'Server error', details: error.message });
  }
});

module.exports = router;
