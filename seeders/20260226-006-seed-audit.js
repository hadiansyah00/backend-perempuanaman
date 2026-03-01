'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const rawData = [
      {
        id: 1,
        slug: "laporan-keuangan-tahunan-2023",
        year: 2023,
        title: "Laporan Keuangan Tahunan 2023",
        description: "Laporan audit independen atas posisi keuangan Perempuan AMAN untuk tahun yang berakhir pada 31 Desember 2023.",
        fileBerkas: "/docs/1.-STATUTA-PEREMPUAN-AMAN-2021-2026_Rev.pdf",
      },
      {
        id: 2,
        slug: "laporan-keuangan-tahunan-2022",
        year: 2022,
        title: "Laporan Keuangan Tahunan 2022",
        description: "Laporan keuangan komprehensif termasuk neraca, laporan laba rugi, dan arus kas yang telah diaudit.",
        fileBerkas: "/docs/1.-STATUTA-PEREMPUAN-AMAN-2021-2026_Rev.pdf",
      },
      {
        id: 3,
        slug: "laporan-keuangan-tahunan-2021",
        year: 2021,
        title: "Laporan Keuangan Tahunan 2021",
        description: "Opini wajar tanpa pengecualian dari KAP terhadap pengelolaan dana publik dan hibah organisasi.",
        fileBerkas: "/docs/1.-STATUTA-PEREMPUAN-AMAN-2021-2026_Rev.pdf",
      },
      {
        id: 4,
        slug: "laporan-keuangan-tahunan-2020",
        year: 2020,
        title: "Laporan Keuangan Tahunan 2020",
        description: "Laporan pertanggungjawaban tata kelola keuangan organisasi di masa awal pandemi.",
        fileBerkas: "/docs/1.-STATUTA-PEREMPUAN-AMAN-2021-2026_Rev.pdf",
      },
      {
        id: 5,
        slug: "laporan-keuangan-tahunan-2019",
        year: 2019,
        title: "Laporan Keuangan Tahunan 2019",
        description: "Audit periodik yang diserahkan dan disahkan dalam Rapat Kerja Nasional 2020.",
        fileBerkas: "/docs/1.-STATUTA-PEREMPUAN-AMAN-2021-2026_Rev.pdf",
      },
      {
        id: 6,
        slug: "laporan-keuangan-tahunan-2018",
        year: 2018,
        title: "Laporan Keuangan Tahunan 2018",
        description: "Konsoldasi laporan dari berbagai proyek strategis dan manajemen pendanaan internal.",
        fileBerkas: "/docs/1.-STATUTA-PEREMPUAN-AMAN-2021-2026_Rev.pdf",
      },
      {
        id: 7,
        slug: "laporan-keuangan-tahunan-2017",
        year: 2017,
        title: "Laporan Keuangan Tahunan 2017",
        description: "Laporan audit historikal periode 2017.",
        fileBerkas: "/docs/1.-STATUTA-PEREMPUAN-AMAN-2021-2026_Rev.pdf",
      },
    ];

    const now = new Date();
    await queryInterface.bulkInsert(
      'audit_reports',
      rawData.map(rep => ({ ...rep, createdAt: now, updatedAt: now }))
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('audit_reports', null, {});
  }
};
