const express = require('express');
const router = express.Router();
const { MediaGallery } = require('../models');
const authenticate = require('../middleware/auth');
const authorize = require('../middleware/role');

// GET /api/gallery -> List all (optional filter ?type=Photo/Video & ?category=)
router.get('/', async (req, res) => {
  try {
    const where = {};
    if (req.query.type) where.type = req.query.type;
    if (req.query.category) where.category = req.query.category;
    
    const media = await MediaGallery.findAll({
      where,
      order: [['id', 'DESC']]
    });
    return res.json({ data: media });
  } catch (error) {
    console.error('Fetch gallery error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/gallery/:id -> Get single piece of media
router.get('/:id', async (req, res) => {
  try {
    const item = await MediaGallery.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Data tidak ditemukan' });
    return res.json({ data: item });
  } catch (error) {
    console.error('Fetch single gallery item error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Admin routes below
router.use(authenticate);
router.use(authorize('super_admin', 'admin', 'writer'));

// POST /api/gallery -> Create media
router.post('/', async (req, res) => {
  try {
    const item = await MediaGallery.create(req.body);
    return res.status(201).json({ message: 'Media created', data: item });
  } catch (error) {
    console.error('Create media error:', error);
    return res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// PUT /api/gallery/:id -> Update media
router.put('/:id', async (req, res) => {
  try {
    const item = await MediaGallery.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Data tidak ditemukan' });

    await item.update(req.body);
    return res.json({ message: 'Media updated', data: item });
  } catch (error) {
    console.error('Update media error:', error);
    return res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// DELETE /api/gallery/:id -> Delete media 
router.delete('/:id', authorize('super_admin', 'admin'), async (req, res) => {
  try {
    const item = await MediaGallery.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Data tidak ditemukan' });

    await item.destroy();
    return res.json({ message: 'Media deleted' });
  } catch (error) {
    console.error('Delete media error:', error);
    return res.status(500).json({ error: 'Server error', details: error.message });
  }
});

module.exports = router;
