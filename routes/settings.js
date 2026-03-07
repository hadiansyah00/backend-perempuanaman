const express = require('express');
const router = express.Router();
const { SiteSetting } = require('../models');
const authenticate = require('../middleware/auth');
const authorize = require('../middleware/role');

// GET /api/settings -> Get all key-value settings map
router.get('/', async (req, res) => {
  try {
    const settings = await SiteSetting.findAll();
    
    // Transform array into a neat key-value object map
    const map = settings.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});
    
    return res.json({ data: map });
  } catch (error) {
    console.error('Fetch settings error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/settings/:key -> Get single setting
router.get('/:key', async (req, res) => {
  try {
    const setting = await SiteSetting.findOne({ where: { key: req.params.key } });
    if (!setting) {
      return res.json({ data: null });
    }
    
    return res.json({ data: setting.value });
  } catch (error) {
    console.error('Fetch single setting error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Admin routes below
router.use(authenticate);
router.use(authorize('super_admin', 'admin', 'writer'));

// PUT /api/settings/:key -> Update a setting
router.put('/:key', async (req, res) => {
  try {
    let setting = await SiteSetting.findOne({ where: { key: req.params.key } });
    
    // Ensure we are saving raw JSON object
    const value = req.body;
    
    if (!setting) {
      setting = await SiteSetting.create({ key: req.params.key, value });
      return res.status(201).json({ message: `Setting ${req.params.key} created`, data: setting });
    }

    await setting.update({ value });
    return res.json({ message: `Setting ${req.params.key} updated`, data: setting });
  } catch (error) {
    console.error('Update setting error:', error);
    return res.status(500).json({ error: 'Server error', details: error.message });
  }
});

module.exports = router;
