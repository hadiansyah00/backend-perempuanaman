'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('provinsi', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      kodeProvinsi: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      namaProvinsi: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      region: {
        type: Sequelize.STRING,
      },
      geoLatitude: {
        type: Sequelize.FLOAT,
      },
      geoLongitude: {
        type: Sequelize.FLOAT,
      },
      svgId: {
        type: Sequelize.STRING,
      },
      highlightColor: {
        type: Sequelize.STRING,
      },
      totalAnggota: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      totalWilayahOrganisasi: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      totalDesa: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      totalKomunitas: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      pemuda: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      dewasa: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      lansia: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      thumbnailPeta: {
        type: Sequelize.STRING,
      },
      coverImage: {
        type: Sequelize.STRING,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    await queryInterface.createTable('wilayah_organisasi', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      provinsiId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: { model: 'provinsi', key: 'id' },
        onDelete: 'CASCADE',
      },
      kodeWilayah: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      jenis: {
        type: Sequelize.ENUM('PHD', 'PHKom', 'PHW'),
        allowNull: false,
      },
      namaWilayah: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      kabupatenKota: {
        type: Sequelize.STRING,
      },
      kecamatan: {
        type: Sequelize.STRING,
      },
      desa: {
        type: Sequelize.STRING,
      },
      jumlahAnggota: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      jumlahKomunitas: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      jumlahDesa: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      ketua: {
        type: Sequelize.STRING,
      },
      sekretaris: {
        type: Sequelize.STRING,
      },
      bendahara: {
        type: Sequelize.STRING,
      },
      aktif: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      tanggalBerdiri: {
        type: Sequelize.DATEONLY,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    await queryInterface.addIndex('wilayah_organisasi', ['provinsiId']);
    await queryInterface.addIndex('wilayah_organisasi', ['jenis']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('wilayah_organisasi');
    await queryInterface.dropTable('provinsi');
    
    // Drop enum if running on Postgres
    if (queryInterface.sequelize.options.dialect === 'postgres') {
      await queryInterface.sequelize.query('DROP TYPE IF EXISTS "public"."enum_wilayah_organisasi_jenis" CASCADE;');
    }
  },
};
