const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const MediaGallery = sequelize.define('MediaGallery', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
    },
    src: {
      type: DataTypes.STRING,
    },
    youtubeUrl: {
      type: DataTypes.STRING,
    },
    alt: {
      type: DataTypes.STRING,
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
