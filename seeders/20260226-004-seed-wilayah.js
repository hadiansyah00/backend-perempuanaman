'use strict';
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const rawData = [
      {
        id: 'sumatera-utara',
        kodeProvinsi: '12',
        namaProvinsi: 'Sumatera Utara',
        region: 'Sumatera',
        geoLatitude: 2.1154,
        geoLongitude: 99.5451,
        svgId: 'ID-SU',
        highlightColor: '#4CAF50',
        totalAnggota: 1542,
        totalWilayahOrganisasi: 5,
        totalDesa: 42,
        totalKomunitas: 18,
        pemuda: 450,
        dewasa: 890,
        lansia: 202,
        thumbnailPeta: '/images/hero-home.png',
        coverImage: '/images/hero-home.png',
        wilayahOrganisasi: [
          { jenis: 'PHW', namaWilayah: 'PHW Sumatera Utara', kabupatenKota: 'Medan', ketua: 'Ibu Arimbi', jumlahAnggota: 1542, aktif: true },
          { jenis: 'PHD', namaWilayah: 'PHD Tapanuli Utara', kabupatenKota: 'Tapanuli Utara', ketua: 'Ibu Sari', jumlahDesa: 15, jumlahAnggota: 450 },
          { jenis: 'PHD', namaWilayah: 'PHD Samosir', kabupatenKota: 'Samosir', ketua: 'Ibu Tiarma', jumlahDesa: 12, jumlahAnggota: 380 },
        ],
      },
      {
        id: 'sumatera-barat',
        kodeProvinsi: '13',
        namaProvinsi: 'Sumatera Barat',
        region: 'Sumatera',
        geoLatitude: -0.7399,
        geoLongitude: 100.8000,
        svgId: 'ID-SB',
        highlightColor: '#8BC34A',
        totalAnggota: 1250,
        totalWilayahOrganisasi: 3,
        totalDesa: 28,
        totalKomunitas: 12,
        pemuda: 320,
        dewasa: 750,
        lansia: 180,
        wilayahOrganisasi: [
          { jenis: 'PHW', namaWilayah: 'PHW Sumatera Barat', kabupatenKota: 'Padang', ketua: 'Ibu Ratna', jumlahAnggota: 1250, aktif: true },
          { jenis: 'PHD', namaWilayah: 'PHD Mentawai', kabupatenKota: 'Kepulauan Mentawai', ketua: 'Ibu Maria', jumlahDesa: 8, jumlahAnggota: 420 },
        ],
      },
      {
        id: 'kalimantan-barat',
        kodeProvinsi: '61',
        namaProvinsi: 'Kalimantan Barat',
        region: 'Kalimantan',
        geoLatitude: -0.2787,
        geoLongitude: 111.4753,
        svgId: 'ID-KB',
        highlightColor: '#CDDC39',
        totalAnggota: 2850,
        totalWilayahOrganisasi: 8,
        totalDesa: 65,
        totalKomunitas: 32,
        pemuda: 850,
        dewasa: 1600,
        lansia: 400,
        wilayahOrganisasi: [
          { jenis: 'PHW', namaWilayah: 'PHW Kalimantan Barat', kabupatenKota: 'Pontianak', ketua: 'Ibu Leni', jumlahAnggota: 2850, aktif: true },
          { jenis: 'PHD', namaWilayah: 'PHD Sintang', kabupatenKota: 'Sintang', ketua: 'Ibu Asih', jumlahDesa: 22, jumlahAnggota: 850 },
          { jenis: 'PHD', namaWilayah: 'PHD Kapuas Hulu', kabupatenKota: 'Kapuas Hulu', ketua: 'Ibu Dara', jumlahDesa: 18, jumlahAnggota: 720 },
        ],
      },
      {
        id: 'kalimantan-timur',
        kodeProvinsi: '64',
        namaProvinsi: 'Kalimantan Timur',
        region: 'Kalimantan',
        geoLatitude: 0.5387,
        geoLongitude: 116.4194,
        svgId: 'ID-KI',
        highlightColor: '#FFEB3B',
        totalAnggota: 1980,
        totalWilayahOrganisasi: 6,
        totalDesa: 48,
        totalKomunitas: 25,
        pemuda: 620,
        dewasa: 1100,
        lansia: 260,
        wilayahOrganisasi: [
          { jenis: 'PHW', namaWilayah: 'PHW Kalimantan Timur', kabupatenKota: 'Samarinda', ketua: 'Ibu Ningsih', jumlahAnggota: 1980, aktif: true },
          { jenis: 'PHD', namaWilayah: 'PHD Kutai Barat', kabupatenKota: 'Kutai Barat', ketua: 'Ibu Yanti', jumlahDesa: 15, jumlahAnggota: 650 },
        ],
      },
      {
        id: 'sulawesi-tengah',
        kodeProvinsi: '72',
        namaProvinsi: 'Sulawesi Tengah',
        region: 'Sulawesi',
        geoLatitude: -1.4300,
        geoLongitude: 121.4456,
        svgId: 'ID-ST',
        highlightColor: '#FFC107',
        totalAnggota: 1420,
        totalWilayahOrganisasi: 4,
        totalDesa: 35,
        totalKomunitas: 15,
        pemuda: 480,
        dewasa: 790,
        lansia: 150,
        wilayahOrganisasi: [
          { jenis: 'PHW', namaWilayah: 'PHW Sulawesi Tengah', kabupatenKota: 'Palu', ketua: 'Ibu Marni', jumlahAnggota: 1420, aktif: true },
          { jenis: 'PHD', namaWilayah: 'PHD Poso', kabupatenKota: 'Poso', ketua: 'Ibu Rina', jumlahDesa: 12, jumlahAnggota: 480 },
        ],
      },
      {
        id: 'sulawesi-selatan',
        kodeProvinsi: '73',
        namaProvinsi: 'Sulawesi Selatan',
        region: 'Sulawesi',
        geoLatitude: -4.1449,
        geoLongitude: 119.9289,
        svgId: 'ID-SN',
        highlightColor: '#FF9800',
        totalAnggota: 2150,
        totalWilayahOrganisasi: 7,
        totalDesa: 52,
        totalKomunitas: 28,
        pemuda: 650,
        dewasa: 1200,
        lansia: 300,
        wilayahOrganisasi: [
          { jenis: 'PHW', namaWilayah: 'PHW Sulawesi Selatan', kabupatenKota: 'Makassar', ketua: 'Ibu Baji', jumlahAnggota: 2150, aktif: true },
          { jenis: 'PHD', namaWilayah: 'PHD Toraja', kabupatenKota: 'Tana Toraja', ketua: 'Ibu Rinding', jumlahDesa: 18, jumlahAnggota: 820 },
          { jenis: 'PHD', namaWilayah: 'PHD Enrekang', kabupatenKota: 'Enrekang', ketua: 'Ibu Hasna', jumlahDesa: 12, jumlahAnggota: 540 },
        ],
      },
      {
        id: 'nusa-tenggara-timur',
        kodeProvinsi: '53',
        namaProvinsi: 'Nusa Tenggara Timur',
        region: 'Bali-Nusra',
        geoLatitude: -8.6500,
        geoLongitude: 121.0800,
        svgId: 'ID-NT',
        highlightColor: '#FF5722',
        totalAnggota: 3240,
        totalWilayahOrganisasi: 9,
        totalDesa: 78,
        totalKomunitas: 45,
        pemuda: 1100,
        dewasa: 1740,
        lansia: 400,
        wilayahOrganisasi: [
          { jenis: 'PHW', namaWilayah: 'PHW NTT', kabupatenKota: 'Kupang', ketua: 'Ibu Ina', jumlahAnggota: 3240, aktif: true },
          { jenis: 'PHD', namaWilayah: 'PHD Ende', kabupatenKota: 'Ende', ketua: 'Ibu Lio', jumlahDesa: 25, jumlahAnggota: 950 },
          { jenis: 'PHD', namaWilayah: 'PHD Sumba Timur', kabupatenKota: 'Sumba Timur', ketua: 'Ibu Rambu', jumlahDesa: 20, jumlahAnggota: 880 },
          { jenis: 'PHD', namaWilayah: 'PHD TTS', kabupatenKota: 'Timor Tengah Selatan', ketua: 'Ibu Fina', jumlahDesa: 15, jumlahAnggota: 620 },
        ],
      },
    ];

    const provinsiArray = [];
    const wilayahOrganisasiArray = [];

    const now = new Date();

    rawData.forEach(prov => {
      // 1. Prepare Provinsi Data
      provinsiArray.push({
        id: prov.id,
        kodeProvinsi: prov.kodeProvinsi,
        namaProvinsi: prov.namaProvinsi,
        region: prov.region,
        geoLatitude: prov.geoLatitude,
        geoLongitude: prov.geoLongitude,
        svgId: prov.svgId,
        highlightColor: prov.highlightColor,
        totalAnggota: prov.totalAnggota,
        totalWilayahOrganisasi: prov.totalWilayahOrganisasi,
        totalDesa: prov.totalDesa,
        totalKomunitas: prov.totalKomunitas,
        pemuda: prov.pemuda,
        dewasa: prov.dewasa,
        lansia: prov.lansia,
        thumbnailPeta: prov.thumbnailPeta || null,
        coverImage: prov.coverImage || null,
        createdAt: now,
        updatedAt: now,
      });

      // 2. Prepare Wilayah Organisasi Data
      if (prov.wilayahOrganisasi && prov.wilayahOrganisasi.length > 0) {
        prov.wilayahOrganisasi.forEach((org, idx) => {
          wilayahOrganisasiArray.push({
            id: `${prov.id}-${idx}`,
            provinsiId: prov.id,
            kodeWilayah: `${prov.kodeProvinsi}-${idx + 1}`,
            jenis: org.jenis,
            namaWilayah: org.namaWilayah,
            kabupatenKota: org.kabupatenKota || null,
            kecamatan: org.kecamatan || null,
            desa: org.desa || null,
            jumlahAnggota: org.jumlahAnggota || 0,
            jumlahKomunitas: org.jumlahKomunitas || 0,
            jumlahDesa: org.jumlahDesa || 0,
            ketua: org.ketua || null,
            sekretaris: org.sekretaris || null,
            bendahara: org.bendahara || null,
            aktif: org.aktif !== undefined ? org.aktif : true,
            tanggalBerdiri: null,
            createdAt: now,
            updatedAt: now,
          });
        });
      }
    });

    await queryInterface.bulkInsert('provinsi', provinsiArray);
    await queryInterface.bulkInsert('wilayah_organisasi', wilayahOrganisasiArray);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('wilayah_organisasi', null, {});
    await queryInterface.bulkDelete('provinsi', null, {});
  }
};
