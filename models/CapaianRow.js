const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const CapaianRow = sequelize.define('CapaianRow', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    capaianId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sortOrder: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    data: {
      type: DataTypes.JSON, // Stores row data matching headers e.g. ["1", "Tujuan A", "Tercapai"]
      allowNull: false,
    },
  }, {
    tableName: 'capaian_rows',
    timestamps: true,
  });

  CapaianRow.associate = (models) => {
    CapaianRow.belongsTo(models.Capaian, {
      foreignKey: 'capaianId',
      as: 'capaian',
    });
  };

  return CapaianRow;
};
