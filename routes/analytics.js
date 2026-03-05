const express = require('express');
const router = express.Router();
const db = require('../models');

// POST /api/analytics/track
// Public endpoint, called once per page load on frontend
router.post('/track', async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    
    // Check if record for today exists
    let stat = await db.VisitorStat.findOne({ where: { date: today } });
    
    // Consider adding simple unique visitor logic using a persistent cookie/token, 
    // but for now, we just count page views
    const isUnique = req.body.unique === true;

    if (stat) {
      await stat.increment('views', { by: 1 });
      if (isUnique) {
        await stat.increment('uniqueVisitors', { by: 1 });
      }
    } else {
      await db.VisitorStat.create({
        date: today,
        views: 1,
        uniqueVisitors: isUnique ? 1 : 0
      });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error tracking analytics:', error);
    res.status(500).json({ error: 'Failed to track data' });
  }
});

// GET /api/analytics/stats
// Admin endpoint to fetch stats (last 12 months)
router.get('/stats', async (req, res) => {
  try {
    // We group views by month using SQL
    // Using PostgreSQL date_trunc or simple raw queries depending on dialect
    // Fallback: fetch last 365 days and aggregate in JS to avoid dialect issues
    
    let statsParams = new Date();
    statsParams.setFullYear(statsParams.getFullYear() - 1);
    
    const records = await db.VisitorStat.findAll({
      order: [['date', 'ASC']]
    });
    
    // Group into 12 months array [M-11, M-10 ... M-0]
    const monthlyViews = Array(12).fill(0);
    const monthlyUniques = Array(12).fill(0);
    
    const now = new Date();
    const currentMonth = now.getMonth(); // 0-11
    const currentYear = now.getFullYear();

    let totalViews = 0;

    records.forEach(r => {
      totalViews += r.views;
      const d = new Date(r.date);
      // Calculate month offset (0 for current month, 1 for last month, up to 11)
      const monthsDiff = (currentYear - d.getFullYear()) * 12 + (currentMonth - d.getMonth());
      
      if (monthsDiff >= 0 && monthsDiff < 12) {
        // Place in array: index 11 is current month, 10 is last month, etc.
        const index = 11 - monthsDiff;
        monthlyViews[index] += r.views;
        monthlyUniques[index] += r.uniqueVisitors;
      }
    });

    const currentMonthViews = monthlyViews[11];
    const lastMonthViews = monthlyViews[10] || 1; // avoid division by zero
    const growthPercent = ((currentMonthViews - lastMonthViews) / lastMonthViews * 100).toFixed(1);

    res.json({ 
      data: {
        totalViews,
        monthlyViews,
        monthlyUniques,
        currentMonthViews,
        growthPercent
      }
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

module.exports = router;
