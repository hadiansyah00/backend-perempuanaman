const express = require('express');
const router = express.Router();
const { AuditReport } = require('../models');
const authenticate = require('../middleware/auth');
const authorize = require('../middleware/role');
const generateSlug = require('../utils/generateSlug');
const { Op } = require('sequelize');

// GET /api/audit -> List all audit reports
router.get('/', async (req, res) => {
  try {
    const reports = await AuditReport.findAll({
      order: [['year', 'DESC']]
    });
    return res.json({ data: reports });
  } catch (error) {
    console.error('Fetch audit reports error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/audit/:slug -> Get single audit report by slug
router.get('/:slug', async (req, res) => {
  try {
    const report = await AuditReport.findOne({ where: { slug: req.params.slug } });
    if (!report) return res.status(404).json({ error: 'Data tidak ditemukan' });
    return res.json({ data: report });
  } catch (error) {
    console.error('Fetch single audit error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Admin routes below -> require writer/admin/super_admin
router.use(authenticate);
router.use(authorize('super_admin', 'admin', 'writer'));

// Auto-generate unique slug
const makeUniqueSlug = async (title, excludeId = null) => {
  let baseSlug = generateSlug(title);
  let slug = baseSlug;
  let counter = 1;
  const whereClause = { slug: slug };
  if (excludeId) whereClause.id = { [Op.ne]: excludeId };
  
  while (await AuditReport.findOne({ where: whereClause })) {
    slug = `${baseSlug}-${counter}`;
    whereClause.slug = slug;
    counter++;
  }
  return slug;
};

// POST /api/audit -> Create new audit report
router.post('/', async (req, res) => {
  try {
    const { year, title, description, fileBerkas } = req.body;
    const slug = await makeUniqueSlug(title);

    const report = await AuditReport.create({
      slug,
      year,
      title,
      description,
      fileBerkas
    });

    return res.status(201).json({ message: 'Audit report created', data: report });
  } catch (error) {
    console.error('Create audit error:', error);
    return res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// PUT /api/audit/:id -> Update audit report
router.put('/:id', async (req, res) => {
  try {
    const report = await AuditReport.findByPk(req.params.id);
    if (!report) return res.status(404).json({ error: 'Data tidak ditemukan' });

    const { year, title, description, fileBerkas } = req.body;
    let updateData = { year, description, fileBerkas };

    // Update slug if title changes
    if (title && title !== report.title) {
      updateData.title = title;
      updateData.slug = await makeUniqueSlug(title, report.id);
    } else if (title) {
      updateData.title = title;
    }

    await report.update(updateData);
    return res.json({ message: 'Audit report updated', data: report });
  } catch (error) {
    console.error('Update audit error:', error);
    return res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// DELETE /api/audit/:id -> Delete audit report 
router.delete('/:id', authorize('super_admin', 'admin'), async (req, res) => {
  try {
    const report = await AuditReport.findByPk(req.params.id);
    if (!report) return res.status(404).json({ error: 'Data tidak ditemukan' });

    await report.destroy();
    return res.json({ message: 'Audit report deleted' });
  } catch (error) {
    console.error('Delete audit error:', error);
    return res.status(500).json({ error: 'Server error', details: error.message });
  }
});

module.exports = router;
