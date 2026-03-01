const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Provinsi = sequelize.define('Provinsi', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    kodeProvinsi: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    namaProvinsi: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    region: {
      type: DataTypes.STRING,
    },
    geoLatitude: {
      type: DataTypes.FLOAT,
    },
    geoLongitude: {
      type: DataTypes.FLOAT,
    },
    svgId: {
      type: DataTypes.STRING,
    },
    highlightColor: {
      type: DataTypes.STRING,
    },
    totalAnggota: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    totalWilayahOrganisasi: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    totalDesa: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    totalKomunitas: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    pemuda: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    dewasa: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    lansia: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    thumbnailPeta: {
      type: DataTypes.STRING,
    },
    coverImage: {
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'provinsi',
    timestamps: true,
  });

  Provinsi.associate = (models) => {
    Provinsi.hasMany(models.WilayahOrganisasi, {
      foreignKey: 'provinsiId',
      as: 'wilayahOrganisasi',
    });
  };

  return Provinsi;
};
