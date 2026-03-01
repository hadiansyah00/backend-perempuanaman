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
