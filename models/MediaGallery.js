const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const MediaGallery = sequelize.define('MediaGallery', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
    },
    src: {
      type: DataTypes.STRING,
    },
    youtubeUrl: {
      type: DataTypes.TEXT,
    },
    alt: {
      type: DataTypes.TEXT,
    },
    type: {
      type: DataTypes.ENUM('Photo', 'Video', 'Document'),
      allowNull: false,
    },
  }, {
    tableName: 'media_gallery',
    timestamps: true,
  });

  return MediaGallery;
};
