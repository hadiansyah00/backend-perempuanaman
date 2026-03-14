const { fn, col, literal } = require("sequelize");
const models = require("../models");

exports.getDashboardStats = async () => {

  const {
    Berita,
    Pustaka,
    SuaraPerempuan,
    MediaGallery,
    User,
    Kategori,
    WilayahOrganisasi,
    VisitorStat
  } = models;

  /* ===============================
     CONTENT STATS
  =============================== */

  const [
    berita,
    pustaka,
    tutur,
    gallery,
    users,
    categories,
    wilayah
  ] = await Promise.all([
    Berita.count(),
    Pustaka.count(),
    SuaraPerempuan.count(),
    MediaGallery.count(),
    User.count(),
    Kategori.count(),
    WilayahOrganisasi.count()
  ]);

  /* ===============================
     VISITOR STATS
  =============================== */

  let monthlyViews = Array(12).fill(0);
  let currentMonthViews = 0;

  if (VisitorStat) {

    const visitorStats = await VisitorStat.findAll({
      attributes: [
        [literal('EXTRACT(MONTH FROM "date")'), "month"],
        [fn("SUM", col("views")), "views"]
      ],
      group: [literal('EXTRACT(MONTH FROM "date")')],
      order: [[literal('EXTRACT(MONTH FROM "date")'), "ASC"]]
    });

    visitorStats.forEach(v => {

      const month = parseInt(v.get("month")) - 1;

      if (month >= 0 && month < 12) {
        monthlyViews[month] = parseInt(v.get("views"));
      }

    });

    currentMonthViews = monthlyViews[new Date().getMonth()];
  }

  /* ===============================
     RESPONSE
  =============================== */

  return {
    berita,
    pustaka,
    tutur,
    gallery,
    users,
    categories,
    wilayahCount: wilayah,
    monthlyViews,
    currentMonthViews
  };

};