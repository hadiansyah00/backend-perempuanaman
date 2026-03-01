const { Sequelize } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 1. Delete all existing wilayah_organisasi and provinsi
    await queryInterface.bulkDelete('wilayah_organisasi', null, {});
    await queryInterface.bulkDelete('provinsi', null, {});

    // 2. Insert exactly the 7 manual Regions, mapping geoLatitude/geoLongitude into top/left percentages
    const regions = [
      { id: 'sumatera', kodeProvinsi: '1', namaProvinsi: 'Sumatera', region: 'Sumatera', geoLongitude: 18, geoLatitude: 46, svgId: 'ID-SM', highlightColor: '#4CAF50', totalAnggota: 4800, totalWilayahOrganisasi: 12, totalDesa: 42, totalKomunitas: 28, pemuda: 1500, dewasa: 2800, lansia: 500, createdAt: new Date(), updatedAt: new Date() },
      { id: 'jawa', kodeProvinsi: '2', namaProvinsi: 'Jawa', region: 'Jawa', geoLongitude: 38, geoLatitude: 66, svgId: 'ID-JW', highlightColor: '#2196F3', totalAnggota: 3500, totalWilayahOrganisasi: 8, totalDesa: 25, totalKomunitas: 15, pemuda: 1200, dewasa: 2000, lansia: 300, createdAt: new Date(), updatedAt: new Date() },
      { id: 'kalimantan', kodeProvinsi: '3', namaProvinsi: 'Kalimantan', region: 'Kalimantan', geoLongitude: 45, geoLatitude: 40, svgId: 'ID-KA', highlightColor: '#FF9800', totalAnggota: 2200, totalWilayahOrganisasi: 5, totalDesa: 18, totalKomunitas: 10, pemuda: 800, dewasa: 1100, lansia: 300, createdAt: new Date(), updatedAt: new Date() },
      { id: 'bali-nusra', kodeProvinsi: '4', namaProvinsi: 'Bali & Nusra', region: 'Bali Nusra', geoLongitude: 52, geoLatitude: 68, svgId: 'ID-BA', highlightColor: '#E91E63', totalAnggota: 1800, totalWilayahOrganisasi: 4, totalDesa: 14, totalKomunitas: 8, pemuda: 600, dewasa: 1000, lansia: 200, createdAt: new Date(), updatedAt: new Date() },
      { id: 'sulawesi', kodeProvinsi: '5', namaProvinsi: 'Sulawesi', region: 'Sulawesi', geoLongitude: 56, geoLatitude: 50, svgId: 'ID-SL', highlightColor: '#9C27B0', totalAnggota: 2600, totalWilayahOrganisasi: 6, totalDesa: 20, totalKomunitas: 12, pemuda: 900, dewasa: 1400, lansia: 300, createdAt: new Date(), updatedAt: new Date() },
      { id: 'maluku', kodeProvinsi: '6', namaProvinsi: 'Maluku', region: 'Maluku', geoLongitude: 70, geoLatitude: 52, svgId: 'ID-MA', highlightColor: '#00BCD4', totalAnggota: 1400, totalWilayahOrganisasi: 3, totalDesa: 12, totalKomunitas: 5, pemuda: 500, dewasa: 750, lansia: 150, createdAt: new Date(), updatedAt: new Date() },
      { id: 'papua', kodeProvinsi: '7', namaProvinsi: 'Papua', region: 'Papua', geoLongitude: 84, geoLatitude: 54, svgId: 'ID-PA', highlightColor: '#F44336', totalAnggota: 2100, totalWilayahOrganisasi: 4, totalDesa: 16, totalKomunitas: 9, pemuda: 700, dewasa: 1100, lansia: 300, createdAt: new Date(), updatedAt: new Date() }
    ];

    await queryInterface.bulkInsert('provinsi', regions);

    // 3. Insert some dummy branches for each region to verify functionality
    const branches = [];
    regions.forEach((region, i) => {
      branches.push({
        id: `${region.id}-phw-1`,
        provinsiId: region.id,
        kodeWilayah: `W-PHW-${i+1}`,
        jenis: 'PHW',
        namaWilayah: `PHW ${region.namaProvinsi}`,
        kabupatenKota: 'Pusat Area',
        jumlahAnggota: 500,
        jumlahKomunitas: 2,
        jumlahDesa: 4,
        ketua: 'Ibu Ketua ' + region.namaProvinsi,
        aktif: true,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    });

    await queryInterface.bulkInsert('wilayah_organisasi', branches);
  },

  down: async (queryInterface, Sequelize) => {
    // Keep it simple
    await queryInterface.bulkDelete('wilayah_organisasi', null, {});
    await queryInterface.bulkDelete('provinsi', null, {});
  }
};
