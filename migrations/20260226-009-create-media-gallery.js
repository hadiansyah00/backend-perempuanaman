'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('media_gallery', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      category: {
        type: Sequelize.STRING,
      },
      src: {
        type: Sequelize.STRING,
      },
      youtubeUrl: {
        type: Sequelize.STRING,
      },
      alt: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.ENUM('Photo', 'Video'),
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    await queryInterface.addIndex('media_gallery', ['type']);
    await queryInterface.addIndex('media_gallery', ['category']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('media_gallery');
    
    if (queryInterface.sequelize.options.dialect === 'postgres') {
      await queryInterface.sequelize.query('DROP TYPE IF EXISTS "public"."enum_media_gallery_type" CASCADE;');
    }
  },
};
