const express = require('express');
const router = express.Router();
const { SuaraPerempuan } = require('../models');
const authenticate = require('../middleware/auth');
const authorize = require('../middleware/role');

// GET /api/suara-perempuan -> List all podcasts
router.get('/', async (req, res) => {
  try {
    const tuturs = await SuaraPerempuan.findAll({
      order: [['id', 'DESC']]
    });
    return res.json({ data: tuturs });
  } catch (error) {
    console.error('Fetch suara perempuan error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/suara-perempuan/:id -> Get single podcast
router.get('/:id', async (req, res) => {
  try {
    const tutur = await SuaraPerempuan.findByPk(req.params.id);
    if (!tutur) return res.status(404).json({ error: 'Data tidak ditemukan' });
    return res.json({ data: tutur });
  } catch (error) {
    console.error('Fetch single suara perempuan error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Admin routes below
router.use(authenticate);
router.use(authorize('super_admin', 'admin', 'writer'));

// POST /api/suara-perempuan -> Create podcast
router.post('/', async (req, res) => {
  try {
    const { title, description, coverImage, audioEmbedHtml } = req.body;
    const tutur = await SuaraPerempuan.create({ title, description, coverImage, audioEmbedHtml });
    return res.status(201).json({ message: 'Suara Perempuan created', data: tutur });
  } catch (error) {
    console.error('Create suara perempuan error:', error);
    return res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// PUT /api/suara-perempuan/:id -> Update podcast
router.put('/:id', async (req, res) => {
  try {
    const tutur = await SuaraPerempuan.findByPk(req.params.id);
    if (!tutur) return res.status(404).json({ error: 'Data tidak ditemukan' });

    await tutur.update(req.body);
    return res.json({ message: 'Suara Perempuan updated', data: tutur });
  } catch (error) {
    console.error('Update suara perempuan error:', error);
    return res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// DELETE /api/suara-perempuan/:id -> Delete podcast 
router.delete('/:id', authorize('super_admin', 'admin'), async (req, res) => {
  try {
    const tutur = await SuaraPerempuan.findByPk(req.params.id);
    if (!tutur) return res.status(404).json({ error: 'Data tidak ditemukan' });

    await tutur.destroy();
    return res.json({ message: 'Suara Perempuan deleted' });
  } catch (error) {
    console.error('Delete suara perempuan error:', error);
    return res.status(500).json({ error: 'Server error', details: error.message });
  }
});

module.exports = router;
