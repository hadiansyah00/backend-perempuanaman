const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Capaian = sequelize.define('Capaian', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    headers: {
      type: DataTypes.JSON, // Stores array of column headers e.g. ["No", "Capaian", "Keterangan"]
    },
  }, {
    tableName: 'capaian',
    timestamps: true,
  });

  Capaian.associate = (models) => {
    Capaian.hasMany(models.CapaianRow, {
      foreignKey: 'capaianId',
      as: 'rows',
    });
  };

  return Capaian;
};
