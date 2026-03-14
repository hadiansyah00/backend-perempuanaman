'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { visiMisiData } = await import('../../frontend-perempuanaman/data/visiMisiData.js');
    const { strukturData } = await import('../../frontend-perempuanaman/data/strukturData.js');
    const { alurData } = await import('../../frontend-perempuanaman/data/alurData.js');
    const { defaultSiteSettings } = await import('../../frontend-perempuanaman/data/siteSettingsData.js');
    const { defaultDonasiData } = await import('../../frontend-perempuanaman/data/donasiData.js');

    const settingsData = [
      {
        key: 'visi_misi',
        value: JSON.stringify(visiMisiData),
        description: 'Konten halaman Visi dan Misi'
      },
      {
        key: 'struktur',
        value: JSON.stringify(strukturData),
        description: 'Bagan Struktur Organisasi'
      },
      {
        key: 'alur',
        value: JSON.stringify(alurData),
        description: 'Data interaktif Alur Pembentukan (PHKom, PHD, PHW)'
      },
      {
        key: 'navigation',
        value: JSON.stringify(defaultSiteSettings),
        description: 'Pengaturan navigasi Navbar, Footer, dan Info Kontak Global'
      },
      {
        key: 'donasi',
        value: JSON.stringify(defaultDonasiData),
        description: 'Konten halaman Donasi, detail rekening, dan benefit'
      },
      {
        key: 'sop',
        value: JSON.stringify({ url: '/docs/SOP-Verifikasi-Anggota_Keorg_NEW.pdf' }),
        description: 'URL dokumen SOP Verifikasi Anggota'
      },
      {
        key: 'statuta',
        value: JSON.stringify({ url: '/docs/1.-STATUTA-PEREMPUAN-AMAN-2021-2026_Rev.pdf' }),
        description: 'URL dokumen Statuta'
      },
      {
        key: 'art',
        value: JSON.stringify({ url: '/docs/2.-ART-Perempuan-AMAN-2021-2026_Rev.pdf' }),
        description: 'URL dokumen ART'
      }
    ];

    const now = new Date();
    await queryInterface.bulkInsert(
      'site_settings',
      settingsData.map(s => ({ ...s, createdAt: now, updatedAt: now }))
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('site_settings', null, {});
  }
};
