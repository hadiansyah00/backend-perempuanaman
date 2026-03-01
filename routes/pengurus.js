const express = require('express');
const router = express.Router();
const { Pengurus } = require('../models');
const authenticate = require('../middleware/auth');
const authorize = require('../middleware/role');

// GET /api/pengurus -> List all (optional filter ?type=)
router.get('/', async (req, res) => {
  try {
    const where = {};
    if (req.query.type) {
      where.type = req.query.type;
    }
    const pengurus = await Pengurus.findAll({
      where,
      order: [['id', 'ASC']]
    });
    return res.json({ data: pengurus });
  } catch (error) {
    console.error('Fetch pengurus error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/pengurus/:id -> Get single
router.get('/:id', async (req, res) => {
  try {
    const p = await Pengurus.findByPk(req.params.id);
    if (!p) return res.status(404).json({ error: 'Data tidak ditemukan' });
    return res.json({ data: p });
  } catch (error) {
    console.error('Fetch single pengurus error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Admin routes below
router.use(authenticate);
router.use(authorize('super_admin', 'admin', 'writer'));

// POST /api/pengurus -> Create
router.post('/', async (req, res) => {
  try {
    const p = await Pengurus.create(req.body);
    return res.status(201).json({ message: 'Pengurus created', data: p });
  } catch (error) {
    console.error('Create pengurus error:', error);
    return res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// PUT /api/pengurus/:id -> Update
router.put('/:id', async (req, res) => {
  try {
    const p = await Pengurus.findByPk(req.params.id);
    if (!p) return res.status(404).json({ error: 'Data tidak ditemukan' });

    await p.update(req.body);
    return res.json({ message: 'Pengurus updated', data: p });
  } catch (error) {
    console.error('Update pengurus error:', error);
    return res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// DELETE /api/pengurus/:id -> Delete 
router.delete('/:id', authorize('super_admin', 'admin'), async (req, res) => {
  try {
    const p = await Pengurus.findByPk(req.params.id);
    if (!p) return res.status(404).json({ error: 'Data tidak ditemukan' });

    await p.destroy();
    return res.json({ message: 'Pengurus deleted' });
  } catch (error) {
    console.error('Delete pengurus error:', error);
    return res.status(500).json({ error: 'Server error', details: error.message });
  }
});

module.exports = router;
