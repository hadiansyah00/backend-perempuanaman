const express = require('express');
const router = express.Router();
const Joi = require('joi');
const db = require('../models');
const authenticate = require('../middleware/auth');
const authorize = require('../middleware/role');
const generateSlug = require('../utils/generateSlug');

// --- TAXONOMY CONTROLLER FOR CATEGORIES --- //

const taxonomySchema = Joi.object({
  name: Joi.string().min(2).max(255).required()
});

// GET /api/taxonomy/kategori -> Get All Categories
router.get('/kategori', async (req, res) => {
  try {
    const data = await db.Kategori.findAll({ order: [['name', 'ASC']] });
    return res.json({ data });
  } catch (err) {
    console.error('Fetch Kategoris Error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/taxonomy/kategori -> Create Category
router.post('/kategori', authenticate, authorize('super_admin', 'admin', 'writer'), async (req, res) => {
  try {
    const { error, value } = taxonomySchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    
    let slug = generateSlug(value.name);
    // Ensure slug uniqueness
    const existing = await db.Kategori.findOne({ where: { slug } });
    if (existing) slug = `${slug}-${Date.now()}`;

    const created = await db.Kategori.create({ name: value.name, slug });
    return res.status(201).json({ message: 'Kategori berhasil dibuat', data: created });
  } catch (err) {
    console.error('Create Kategori Error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/taxonomy/kategori/:id -> Update Category
router.put('/kategori/:id', authenticate, authorize('super_admin', 'admin', 'writer'), async (req, res) => {
  try {
    const category = await db.Kategori.findByPk(req.params.id);
    if (!category) return res.status(404).json({ error: 'Kategori tidak ditemukan' });

    const { error, value } = taxonomySchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    let slug = generateSlug(value.name);
    if (slug !== category.slug) {
        const existing = await db.Kategori.findOne({ where: { slug } });
        if (existing && existing.id !== category.id) slug = `${slug}-${Date.now()}`;
    }

    await category.update({ name: value.name, slug });
    // Keep category names synced in current Berita entries
    await db.Berita.update({ categoryName: value.name }, { where: { categoryName: category.name } });

    return res.json({ message: 'Kategori berhasil diperbarui', data: category });
  } catch (err) {
    console.error('Update Kategori Error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/taxonomy/kategori/:id -> Delete Category
router.delete('/kategori/:id', authenticate, authorize('super_admin', 'admin'), async (req, res) => {
  try {
    const category = await db.Kategori.findByPk(req.params.id);
    if (!category) return res.status(404).json({ error: 'Kategori tidak ditemukan' });

    await category.destroy();
    return res.json({ message: 'Kategori berhasil dihapus' });
  } catch (err) {
    console.error('Delete Kategori Error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});


// --- TAXONOMY CONTROLLER FOR TAGS --- //

// GET /api/taxonomy/tags -> Get All Tags
router.get('/tags', async (req, res) => {
  try {
    const data = await db.Tag.findAll({ order: [['name', 'ASC']] });
    return res.json({ data });
  } catch (err) {
    console.error('Fetch Tags Error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/taxonomy/tags -> Create Tag
router.post('/tags', authenticate, authorize('super_admin', 'admin', 'writer'), async (req, res) => {
  try {
    const { error, value } = taxonomySchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    
    let slug = generateSlug(value.name);
    // Ensure slug uniqueness
    const existing = await db.Tag.findOne({ where: { slug } });
    if (existing) slug = `${slug}-${Date.now()}`;

    const created = await db.Tag.create({ name: value.name, slug });
    return res.status(201).json({ message: 'Tag berhasil dibuat', data: created });
  } catch (err) {
    console.error('Create Tag Error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/taxonomy/tags/:id -> Update Tag
router.put('/tags/:id', authenticate, authorize('super_admin', 'admin', 'writer'), async (req, res) => {
  try {
    const tag = await db.Tag.findByPk(req.params.id);
    if (!tag) return res.status(404).json({ error: 'Tag tidak ditemukan' });

    const { error, value } = taxonomySchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    let slug = generateSlug(value.name);
    if (slug !== tag.slug) {
        const existing = await db.Tag.findOne({ where: { slug } });
        if (existing && existing.id !== tag.id) slug = `${slug}-${Date.now()}`;
    }

    await tag.update({ name: value.name, slug });
    // Keep tag texts synced in BeritaTag associations mapping
    await db.BeritaTag.update({ tag: value.name }, { where: { tag: tag.name } });

    return res.json({ message: 'Tag berhasil diperbarui', data: tag });
  } catch (err) {
    console.error('Update Tag Error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/taxonomy/tags/:id -> Delete Tag
router.delete('/tags/:id', authenticate, authorize('super_admin', 'admin'), async (req, res) => {
  try {
    const tag = await db.Tag.findByPk(req.params.id);
    if (!tag) return res.status(404).json({ error: 'Tag tidak ditemukan' });

    await tag.destroy();
    return res.json({ message: 'Tag berhasil dihapus' });
  } catch (err) {
    console.error('Delete Tag Error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
