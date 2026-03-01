const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Pustaka = sequelize.define('Pustaka', {
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
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    image: {
      type: DataTypes.STRING,
    },
    pdfUrl: {
      type: DataTypes.STRING,
    },
    publishedYear: {
      type: DataTypes.INTEGER,
    },
    pages: {
      type: DataTypes.INTEGER,
    },
  }, {
    tableName: 'pustaka',
    timestamps: true,
  });

  return Pustaka;
};
