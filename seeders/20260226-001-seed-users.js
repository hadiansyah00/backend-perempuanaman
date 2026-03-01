'use strict';
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const hashedPassword = await bcrypt.hash('admin123', 12);

    await queryInterface.bulkInsert('users', [
      {
        name: 'Super Admin',
        email: 'superadmin@perempuanaman.or.id',
        password: hashedPassword,
        role: 'super_admin',
        avatar: '👑',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Admin Konten',
        email: 'admin@perempuanaman.or.id',
        password: hashedPassword,
        role: 'admin',
        avatar: '🛡️',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Penulis',
        email: 'writer@perempuanaman.or.id',
        password: hashedPassword,
        role: 'writer',
        avatar: '✍️',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Pengguna',
        email: 'user@perempuanaman.or.id',
        password: hashedPassword,
        role: 'user',
        avatar: '👤',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
