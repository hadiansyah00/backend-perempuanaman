const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const SuaraPerempuan = sequelize.define('SuaraPerempuan', {
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
    coverImage: {
      type: DataTypes.STRING,
    },
    audioEmbedHtml: {
      type: DataTypes.TEXT,
    },
  }, {
    tableName: 'suara_perempuan',
    timestamps: true,
  });

  return SuaraPerempuan;
};
