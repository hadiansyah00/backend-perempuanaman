const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const WilayahOrganisasi = sequelize.define('WilayahOrganisasi', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    provinsiId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    kodeWilayah: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jenis: {
      type: DataTypes.ENUM('PHD', 'PHKom', 'PHW'),
      allowNull: false,
    },
    namaWilayah: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    kabupatenKota: {
      type: DataTypes.STRING,
    },
    kecamatan: {
      type: DataTypes.STRING,
    },
    desa: {
      type: DataTypes.STRING,
    },
    jumlahAnggota: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    jumlahKomunitas: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    jumlahDesa: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    ketua: {
      type: DataTypes.STRING,
    },
    sekretaris: {
      type: DataTypes.STRING,
    },
    bendahara: {
      type: DataTypes.STRING,
    },
    aktif: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    tanggalBerdiri: {
      type: DataTypes.DATEONLY,
    },
  }, {
    tableName: 'wilayah_organisasi',
    timestamps: true,
  });

  WilayahOrganisasi.associate = (models) => {
    WilayahOrganisasi.belongsTo(models.Provinsi, {
      foreignKey: 'provinsiId',
      as: 'provinsi',
    });
  };

  return WilayahOrganisasi;
};
