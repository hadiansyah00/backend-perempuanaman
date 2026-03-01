'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('wilayah_organisasi', 'pemuda', {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false
    });
    await queryInterface.addColumn('wilayah_organisasi', 'dewasa', {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false
    });
    await queryInterface.addColumn('wilayah_organisasi', 'lansia', {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('wilayah_organisasi', 'pemuda');
    await queryInterface.removeColumn('wilayah_organisasi', 'dewasa');
    await queryInterface.removeColumn('wilayah_organisasi', 'lansia');
  }
};
