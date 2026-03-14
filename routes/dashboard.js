const express = require("express");
const router = express.Router();

const { getDashboardStats } = require("../utils/dashboardStats");

router.get("/stats", async (req, res) => {

  try {

    const stats = await getDashboardStats();

    res.json({
      success: true,
      data: stats
    });

  } catch (error) {

    console.error("Dashboard error:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

});

module.exports = router;