const express = require('express');
const router = express.Router();
const { Provinsi, WilayahOrganisasi } = require('../models');
const authenticate = require('../middleware/auth');
const authorize = require('../middleware/role');

// GET /api/wilayah -> Get all provinces with aggregate data
router.get('/', async (req, res) => {
  try {
    const provinsi = await Provinsi.findAll({
      include: [
        { model: WilayahOrganisasi, as: 'wilayahOrganisasi' }
      ],
      order: [['namaProvinsi', 'ASC']]
    });
    return res.json({ data: provinsi });
  } catch (error) {
    console.error('Fetch wilayah error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/wilayah/:id -> Get single province by ID
router.get('/:id', async (req, res) => {
  try {
    const prov = await Provinsi.findByPk(req.params.id, {
      include: [
        { model: WilayahOrganisasi, as: 'wilayahOrganisasi' }
      ]
    });
    if (!prov) return res.status(404).json({ error: 'Provinsi tidak ditemukan' });
    return res.json({ data: prov });
  } catch (error) {
    console.error('Fetch single wilayah error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Admin routes below
router.use(authenticate);
router.use(authorize('super_admin', 'admin', 'writer'));

// POST /api/wilayah -> Create new province
router.post('/', async (req, res) => {
  try {
    const prov = await Provinsi.create(req.body);
    return res.status(201).json({ message: 'Provinsi created', data: prov });
  } catch (error) {
    console.error('Create prov error:', error);
    return res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// PUT /api/wilayah/:id -> Update province
router.put('/:id', async (req, res) => {
  try {
    const prov = await Provinsi.findByPk(req.params.id);
    if (!prov) return res.status(404).json({ error: 'Provinsi tidak ditemukan' });
    
    await prov.update(req.body);
    return res.json({ message: 'Provinsi updated', data: prov });
  } catch (error) {
    console.error('Update prov error:', error);
    return res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// POST /api/wilayah/:id/organisasi -> Add organizational unit
router.post('/:id/organisasi', async (req, res) => {
  try {
    const prov = await Provinsi.findByPk(req.params.id);
    if (!prov) return res.status(404).json({ error: 'Provinsi tidak ditemukan' });

    const org = await WilayahOrganisasi.create({
      ...req.body,
      provinsiId: prov.id
    });
    return res.status(201).json({ message: 'Organisasi created', data: org });
  } catch (error) {
    console.error('Create organisasi error:', error);
    return res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// PUT /api/wilayah/organisasi/:orgId -> Update organizational unit
router.put('/organisasi/:orgId', async (req, res) => {
  try {
    const org = await WilayahOrganisasi.findByPk(req.params.orgId);
    if (!org) return res.status(404).json({ error: 'Organisasi tidak ditemukan' });

    await org.update(req.body);
    return res.json({ message: 'Organisasi updated', data: org });
  } catch (error) {
    console.error('Update organisasi error:', error);
    return res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// DELETE /api/wilayah/organisasi/:orgId -> Delete organizational unit
router.delete('/organisasi/:orgId', authorize('super_admin', 'admin'), async (req, res) => {
  try {
    const org = await WilayahOrganisasi.findByPk(req.params.orgId);
    if (!org) return res.status(404).json({ error: 'Organisasi tidak ditemukan' });

    await org.destroy();
    return res.json({ message: 'Organisasi deleted' });
  } catch (error) {
    console.error('Delete organisasi error:', error);
    return res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// DELETE /api/wilayah/:id -> Delete province
router.delete('/:id', authorize('super_admin', 'admin'), async (req, res) => {
  try {
    const prov = await Provinsi.findByPk(req.params.id);
    if (!prov) return res.status(404).json({ error: 'Provinsi tidak ditemukan' });

    await prov.destroy();
    return res.json({ message: 'Provinsi deleted' });
  } catch (error) {
    console.error('Delete prov error:', error);
    return res.status(500).json({ error: 'Server error', details: error.message });
  }
});

module.exports = router;
