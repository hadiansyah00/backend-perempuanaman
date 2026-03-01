const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const AuditReport = sequelize.define('AuditReport', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    fileBerkas: {
      type: DataTypes.STRING, // Path to PDF file
    },
  }, {
    tableName: 'audit_reports',
    timestamps: true,
  });

  return AuditReport;
};
