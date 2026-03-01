const express = require('express');
const router = express.Router();
const { Pustaka } = require('../models');
const authenticate = require('../middleware/auth');
const authorize = require('../middleware/role');
const generateSlug = require('../utils/generateSlug');
const { Op } = require('sequelize');

// GET /api/pustaka -> List all publications
router.get('/', async (req, res) => {
  try {
    const pustaka = await Pustaka.findAll({
      order: [['publishedYear', 'DESC']]
    });
    return res.json({ data: pustaka });
  } catch (error) {
    console.error('Fetch pustaka error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/pustaka/:slug -> Get single publication by slug
router.get('/:slug', async (req, res) => {
  try {
    const item = await Pustaka.findOne({ where: { slug: req.params.slug } });
    if (!item) return res.status(404).json({ error: 'Data tidak ditemukan' });
    return res.json({ data: item });
  } catch (error) {
    console.error('Fetch single pustaka error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Admin routes below
router.use(authenticate);
router.use(authorize('super_admin', 'admin', 'writer'));

// Auto-generate unique slug
const makeUniqueSlug = async (title, excludeId = null) => {
  let baseSlug = generateSlug(title);
  let slug = baseSlug;
  let counter = 1;
  const whereClause = { slug: slug };
  if (excludeId) whereClause.id = { [Op.ne]: excludeId };
  
  while (await Pustaka.findOne({ where: whereClause })) {
    slug = `${baseSlug}-${counter}`;
    whereClause.slug = slug;
    counter++;
  }
  return slug;
};

// POST /api/pustaka -> Create new publication
router.post('/', async (req, res) => {
  try {
    const { title, description, image, pdfUrl, publishedYear, pages } = req.body;
    const slug = await makeUniqueSlug(title);

    const item = await Pustaka.create({
      slug, title, description, image, pdfUrl, publishedYear, pages
    });

    return res.status(201).json({ message: 'Pustaka created', data: item });
  } catch (error) {
    console.error('Create pustaka error:', error);
    return res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// PUT /api/pustaka/:id -> Update publication
router.put('/:id', async (req, res) => {
  try {
    const item = await Pustaka.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Data tidak ditemukan' });

    const { title, description, image, pdfUrl, publishedYear, pages } = req.body;
    let updateData = { description, image, pdfUrl, publishedYear, pages };

    if (title && title !== item.title) {
      updateData.title = title;
      updateData.slug = await makeUniqueSlug(title, item.id);
    } else if (title) {
      updateData.title = title;
    }

    await item.update(updateData);
    return res.json({ message: 'Pustaka updated', data: item });
  } catch (error) {
    console.error('Update pustaka error:', error);
    return res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// DELETE /api/pustaka/:id -> Delete publication 
router.delete('/:id', authorize('super_admin', 'admin'), async (req, res) => {
  try {
    const item = await Pustaka.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Data tidak ditemukan' });

    await item.destroy();
    return res.json({ message: 'Pustaka deleted' });
  } catch (error) {
    console.error('Delete pustaka error:', error);
    return res.status(500).json({ error: 'Server error', details: error.message });
  }
});

module.exports = router;
