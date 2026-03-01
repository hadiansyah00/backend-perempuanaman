'use strict';
const db = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      // Migrate distinct Categories from Berita
      const categories = await db.Berita.findAll({
        attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('categoryName')), 'categoryName']],
        where: { categoryName: { [Sequelize.Op.ne]: null } }
      });

      const uniqueCats = categories.map(c => c.categoryName).filter(Boolean);
      for (const name of uniqueCats) {
        const slug = name.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
        await db.Kategori.findOrCreate({ where: { slug }, defaults: { name, slug } });
      }

      // Migrate distinct Tags from BeritaTag
      const tags = await db.BeritaTag.findAll({
        attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('tag')), 'tag']],
      });

      const uniqueTags = tags.map(t => t.tag).filter(Boolean);
      for (const name of uniqueTags) {
        const slug = name.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
        await db.Tag.findOrCreate({ where: { slug }, defaults: { name, slug } });
      }

      console.log('Taxonomy migration successful');
    } catch (err) {
      console.error('Taxonomy migration failed:', err);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('kategoris', null, {});
    await queryInterface.bulkDelete('tags', null, {});
  }
};
