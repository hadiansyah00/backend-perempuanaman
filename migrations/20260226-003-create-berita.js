'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Berita table
    await queryInterface.createTable('berita', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      title: {
        type: Sequelize.STRING(500),
        allowNull: false,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      categoryName: {
        type: Sequelize.STRING,
      },
      excerpt: {
        type: Sequelize.TEXT,
      },
      content: {
        type: Sequelize.TEXT,
      },
      featuredImage: {
        type: Sequelize.STRING,
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

    // Berita Tags
    await queryInterface.createTable('berita_tags', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      beritaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'berita', key: 'id' },
        onDelete: 'CASCADE',
      },
      tag: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });

    await queryInterface.addIndex('berita', ['slug'], { unique: true });
    await queryInterface.addIndex('berita', ['categoryName']);
    await queryInterface.addIndex('berita', ['date']);
    await queryInterface.addIndex('berita_tags', ['beritaId']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('berita_tags');
    await queryInterface.dropTable('berita');
  },
};
