'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('media_gallery', 'title', {
      type: Sequelize.TEXT,
      allowNull: false,
    });
    await queryInterface.changeColumn('media_gallery', 'alt', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.changeColumn('media_gallery', 'youtubeUrl', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('media_gallery', 'title', {
      type: Sequelize.STRING(255),
      allowNull: false,
    });
    await queryInterface.changeColumn('media_gallery', 'alt', {
      type: Sequelize.STRING(255),
      allowNull: true,
    });
    await queryInterface.changeColumn('media_gallery', 'youtubeUrl', {
      type: Sequelize.STRING(255),
      allowNull: true,
    });
  }
};
