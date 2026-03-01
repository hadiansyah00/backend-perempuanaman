const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Pengurus = sequelize.define('Pengurus', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    bio: {
      type: DataTypes.TEXT,
    },
    type: {
      type: DataTypes.ENUM('Dewan Nasional', 'Sekretariat Nasional', 'Dewan Region'),
      allowNull: false,
    },
  }, {
    tableName: 'pengurus',
    timestamps: true,
  });

  return Pengurus;
};
