'use strict';

module.exports = (sequelize, DataTypes) => {
  const Berita = sequelize.define('Berita', {
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
    title: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    categoryName: {
      type: DataTypes.STRING,
    },
    excerpt: {
      type: DataTypes.TEXT,
    },
    content: {
      type: DataTypes.TEXT,
    },
    featuredImage: {
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'berita',
    timestamps: true,
  });

  Berita.associate = (models) => {
    Berita.hasMany(models.BeritaTag, { foreignKey: 'beritaId', as: 'tags', onDelete: 'CASCADE' });
  };

  return Berita;
};
