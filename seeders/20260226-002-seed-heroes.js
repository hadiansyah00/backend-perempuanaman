'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    // Seed all 17 hero entries from heroData.js
    const heroes = [
      { id: 'home', pageName: 'Beranda', route: '/', title: 'PEREMPUAN AMAN', subtitle: 'Persekutuan Perempuan Adat Nusantara', backgroundImage: '/images/hero-home.png', fullHeight: true },
      { id: 'kerja-kami', pageName: 'Kerja Kami', route: '/kerja-kami', title: 'Kerja Kami', subtitle: 'Memperjuangkan hak, melindungi wilayah, dan melestarikan pengetahuan adat', backgroundImage: '/images/hero-home.png', fullHeight: false },
      { id: 'kerja-kami-capaian', pageName: 'Capaian dan Tujuan Strategis', route: '/kerja-kami/capaian', title: 'Capaian & Tujuan Strategis', subtitle: 'Progres pencapaian program kerja PEREMPUAN AMAN di seluruh wilayah Nusantara', backgroundImage: '/images/hero-home.png', fullHeight: false },
      { id: 'kerja-kami-alur', pageName: 'Alur Pembentukan', route: '/kerja-kami/alur', title: 'Alur Pembentukan', subtitle: 'Langkah-langkah pembentukan organisasi Perempuan Aman di tingkat lokal', backgroundImage: '/images/hero-home.png', fullHeight: false },
      { id: 'kerja-kami-sop', pageName: 'SOP Verifikasi', route: '/kerja-kami/sop', title: 'SOP Verifikasi', subtitle: 'Standar operasional prosedur verifikasi keanggotaan PEREMPUAN AMAN', backgroundImage: '/images/hero-home.png', fullHeight: false },
      { id: 'kerja-kami-audit', pageName: 'Audit & Laporan Keuangan', route: '/kerja-kami/audit', title: 'Lembar Audit & Laporan Keuangan', subtitle: 'Transparansi dan akuntabilitas keuangan PEREMPUAN AMAN', backgroundImage: '/images/hero-home.png', fullHeight: false },
      { id: 'publikasi', pageName: 'Publikasi', route: '/publikasi', title: 'Publikasi', subtitle: 'Dokumentasi dan catatan dari perjuangan perempuan adat Nusantara', backgroundImage: '/images/hero-home.png', fullHeight: false },
      { id: 'publikasi-catatan', pageName: 'Catatan Perempuan Adat', route: '/publikasi/catatan', title: 'Catatan Perempuan Adat', subtitle: 'Suara dan refleksi perempuan adat dari berbagai penjuru Nusantara', backgroundImage: '/images/hero-home.png', fullHeight: false },
      { id: 'publikasi-mata', pageName: 'Mata Perempuan Adat', route: '/publikasi/mata', title: 'Mata Perempuan Adat', subtitle: 'Melihat dunia dari perspektif dan pengalaman perempuan adat', backgroundImage: '/images/hero-home.png', fullHeight: false },
      { id: 'publikasi-tutur', pageName: 'Tutur Perempuan Adat', route: '/publikasi/tutur', title: 'Tutur Perempuan Adat', subtitle: 'Cerita lisan dan narasi komunitas perempuan adat Nusantara', backgroundImage: '/images/hero-home.png', fullHeight: false },
      { id: 'publikasi-pustaka', pageName: 'Pustaka', route: '/publikasi/pustaka', title: 'Pustaka', subtitle: 'Koleksi buku, laporan, dan dokumentasi PEREMPUAN AMAN', backgroundImage: '/images/hero-home.png', fullHeight: false },
      { id: 'wilayah', pageName: 'Wilayah Pengorganisasian', route: '/wilayah', title: 'Wilayah Pengorganisasian', subtitle: 'Persebaran wilayah organisasi PEREMPUAN AMAN di seluruh Indonesia', backgroundImage: '/images/hero-home.png', fullHeight: false },
      { id: 'donasi', pageName: 'Donasi', route: '/donasi', title: 'Dukung Gerakan', subtitle: 'Setiap kontribusi Anda membantu memperkuat perjuangan perempuan adat', backgroundImage: '/images/hero-home.png', fullHeight: false },
      { id: 'tentang-kami-statuta', pageName: 'Statuta dan ART', route: '/tentang-kami/statuta', title: 'Statuta & ART', subtitle: 'Landasan konstitusional organisasi PEREMPUAN AMAN', backgroundImage: '/images/hero-home.png', fullHeight: false },
      { id: 'tentang-kami-struktur', pageName: 'Struktur Organisasi', route: '/tentang-kami/struktur', title: 'Struktur Organisasi', subtitle: 'Tata kelola dan hierarki kepemimpinan PEREMPUAN AMAN', backgroundImage: '/images/hero-home.png', fullHeight: false },
      { id: 'tentang-kami-pengurus', pageName: 'Pengurus Nasional', route: '/tentang-kami/pengurus', title: 'Pengurus Nasional', subtitle: 'Dewan Nasional dan pengurus wilayah PEREMPUAN AMAN', backgroundImage: '/images/hero-home.png', fullHeight: false },
      { id: 'tentang-kami-sekretariat', pageName: 'Sekretariat Nasional', route: '/tentang-kami/sekretariat', title: 'Sekretariat Nasional', subtitle: 'Tim operasional dan staf harian PEREMPUAN AMAN', backgroundImage: '/images/hero-home.png', fullHeight: false },
    ];

    const now = new Date();
    await queryInterface.bulkInsert(
      'heroes',
      heroes.map((h) => ({ ...h, createdAt: now, updatedAt: now }))
    );

    // Seed CTA buttons (home + donasi heroes have buttons)
    await queryInterface.bulkInsert('hero_cta_buttons', [
      { heroId: 'home', label: 'Pelajari Kerja Kami', href: '/kerja-kami', sortOrder: 0 },
      { heroId: 'home', label: 'Dukung Gerakan', href: '/donasi', sortOrder: 1 },
      { heroId: 'donasi', label: 'Donasi Sekarang', href: '#cara-donasi', sortOrder: 0 },
    ]);

    // Seed stats (home hero has stats)
    await queryInterface.bulkInsert('hero_stats', [
      { heroId: 'home', value: '500+', label: 'Komunitas', sortOrder: 0 },
      { heroId: 'home', value: '18', label: 'Provinsi', sortOrder: 1 },
      { heroId: 'home', value: '20+', label: 'Tahun Aktif', sortOrder: 2 },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('hero_stats', null, {});
    await queryInterface.bulkDelete('hero_cta_buttons', null, {});
    await queryInterface.bulkDelete('heroes', null, {});
  },
};
