const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Mitra = sequelize.define('Mitra', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    orderStatus: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  }, {
    tableName: 'mitra',
    timestamps: true,
  });

  return Mitra;
};
