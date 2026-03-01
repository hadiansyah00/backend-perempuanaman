'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const rawData = [
      {
        id: 1,
        title: "Perluasan Ruang Hidup",
        description: "Memperluas dan menjamin pengakuan wilayah adat sebagai ruang hidup komunal...",
        headers: ["No", "Capaian", "Keterangan", "Tahun 2023", "Target 2026"],
        rows: [
          { data: ["1", "Pemetaan Wilayah Adat Partisipatif", "Luasan terpetakan", "1.2 Juta Ha", "2.5 Juta Ha"] },
          { data: ["2", "Pengakuan Hukum (SK Hutan Adat)", "Jumlah SK yang diterbitkan", "45 SK", "100 SK"] },
          { data: ["3", "Resolusi Konflik Agraria", "Kasus yang berhasil dimediasi", "12 Kasus", "30 Kasus"] },
        ]
      },
      {
        id: 2,
        title: "Kemandirian Ekonomi",
        description: "Membangun sistem ekonomi lokal yang tangguh...",
        headers: ["No", "Indikator", "Satuan", "Capaian Saat Ini", "Target"],
        rows: [
          { data: ["1", "Koperasi Perempuan Adat", "Jumlah Koperasi Aktif", "18 Koperasi", "50 Koperasi"] },
          { data: ["2", "Sentra Tenun Tradisional", "Kampung Binaan", "24 Kampung", "75 Kampung"] },
          { data: ["3", "Lumbung Pangan Komunal", "Desa Adat", "112 Desa", "300 Desa"] },
        ]
      },
      {
        id: 3,
        title: "Pendidikan & Literasi",
        description: "Meningkatkan akses pendidikan alternatif...",
        headers: ["No", "Program", "Target Peserta", "Realisasi", "Status"],
        rows: [
          { data: ["1", "Sekolah Adat", "Anak/Pemuda Adat", "2,500 Anak", "Berjalan Baik"] },
          { data: ["2", "Bebas Buta Aksara", "Perempuan Dewasa", "850 Orang", "Perlu Peningkatan"] },
          { data: ["3", "Beasiswa Perguruan Tinggi", "Kader Organisasi", "45 Mahasiswa", "Sesuai Target"] },
        ]
      },
      {
        id: 4,
        title: "Kedaulatan Kesehatan",
        description: "Mewujudkan sistem kesehatan yang inklusif...",
        headers: ["No", "Aspek", "Capaian Utama", "Evaluasi"],
        rows: [
          { data: ["1", "Kader Kesehatan Kampung", "Terbentuk 150 Kader terlatih", "Sangat Baik"] },
          { data: ["2", "Apotek Hidup (Tanaman Obat)", "45 Desa memiliki pusat bibit", "On Track"] },
          { data: ["3", "Penurunan Angka Stunting", "Turun 15% di wilayah dampingan", "Masih menjadi fokus utama"] },
        ]
      },
      {
        id: 5,
        title: "Partisipasi Politik",
        description: "Mendorong keterwakilan perempuan adat...",
        headers: ["No", "Indikator Capaian", "2019-2022", "2023-2024", "Tren"],
        rows: [
          { data: ["1", "Keterwakilan di BPD (Desa)", "120 Orang", "345 Orang", "Naik Signifikan"] },
          { data: ["2", "Kepala Desa Perempuan", "15 Orang", "42 Orang", "Naik Stabil"] },
          { data: ["3", "Kader dalam Regulasi Daerah", "8 Produk Hukum", "21 Produk Hukum", "Progresif"] },
        ]
      }
    ];

    const capaianArray = [];
    const capaianRowsArray = [];
    const now = new Date();

    rawData.forEach(item => {
      // Create Capaian
      capaianArray.push({
        id: item.id,
        title: item.title,
        description: item.description,
        headers: JSON.stringify(item.headers),
        createdAt: now,
        updatedAt: now
      });

      // Create Rows
      item.rows.forEach((row, idx) => {
        capaianRowsArray.push({
          capaianId: item.id,
          sortOrder: idx,
          data: JSON.stringify(row.data),
          createdAt: now,
          updatedAt: now
        });
      });
    });

    await queryInterface.bulkInsert('capaian', capaianArray);
    await queryInterface.bulkInsert('capaian_rows', capaianRowsArray);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('capaian_rows', null, {});
    await queryInterface.bulkDelete('capaian', null, {});
  }
};
