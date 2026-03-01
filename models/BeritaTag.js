'use strict';

module.exports = (sequelize, DataTypes) => {
  const BeritaTag = sequelize.define('BeritaTag', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    beritaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tag: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'berita_tags',
    timestamps: false,
  });

  BeritaTag.associate = (models) => {
    BeritaTag.belongsTo(models.Berita, { foreignKey: 'beritaId' });
  };

  return BeritaTag;
};
