'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add deskripsiProfil - rich HTML content for full profile description
    await queryInterface.addColumn('wilayah_organisasi', 'deskripsiProfil', {
      type: Sequelize.TEXT,
      allowNull: true,
    });

    // Add ringkasanProfil - plain text excerpt for map/card preview
    await queryInterface.addColumn('wilayah_organisasi', 'ringkasanProfil', {
      type: Sequelize.STRING(500),
      allowNull: true,
    });

    // Add galeriFoto - JSON array of image URLs
    await queryInterface.addColumn('wilayah_organisasi', 'galeriFoto', {
      type: Sequelize.TEXT,
      allowNull: true,
      comment: 'JSON array of gallery image URLs',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('wilayah_organisasi', 'deskripsiProfil');
    await queryInterface.removeColumn('wilayah_organisasi', 'ringkasanProfil');
    await queryInterface.removeColumn('wilayah_organisasi', 'galeriFoto');
  },
};
