const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const SiteSetting = sequelize.define('SiteSetting', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    key: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    value: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'site_settings',
    timestamps: true,
  });

  return SiteSetting;
};
