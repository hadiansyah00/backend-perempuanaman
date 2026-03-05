const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const VisitorStat = sequelize.define('VisitorStat', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      unique: true,
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    uniqueVisitors: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    }
  }, {
    tableName: 'visitor_stats',
    timestamps: true,
  });

  return VisitorStat;
};
