'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Heroes table
    await queryInterface.createTable('heroes', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      pageName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      route: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      subtitle: {
        type: Sequelize.TEXT,
      },
      backgroundImage: {
        type: Sequelize.STRING,
      },
      fullHeight: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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

    // Hero CTA Buttons
    await queryInterface.createTable('hero_cta_buttons', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      heroId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: { model: 'heroes', key: 'id' },
        onDelete: 'CASCADE',
      },
      label: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      href: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sortOrder: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
    });

    // Hero Stats
    await queryInterface.createTable('hero_stats', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      heroId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: { model: 'heroes', key: 'id' },
        onDelete: 'CASCADE',
      },
      value: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      label: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sortOrder: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
    });

    await queryInterface.addIndex('hero_cta_buttons', ['heroId']);
    await queryInterface.addIndex('hero_stats', ['heroId']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('hero_stats');
    await queryInterface.dropTable('hero_cta_buttons');
    await queryInterface.dropTable('heroes');
  },
};
