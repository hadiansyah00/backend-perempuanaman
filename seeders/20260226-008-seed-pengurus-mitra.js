'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const pengurusData = [
      {
        id: 1,
        name: 'Meiliana Yumi',
        role: 'Ketua Dewan Nasional Region Sumatera',
        image: '/images/hero-home.png',
        bio: 'Meiliana Yumi aktif mengorganisir dan memperjuangkan hak-hak perempuan adat di wilayah Sumatera. Ia berfokus pada pengakuan wilayah adat dan kesejahteraan komunitas.',
        type: 'Dewan Region'
      },
      {
        id: 2,
        name: 'Hermina Mawa',
        role: 'Dewan Nasional Region Bali-Nusra',
        image: '/images/hero-home.png',
        bio: 'Hermina Mawa mengawal suara perempuan adat di wilayah Bali dan Nusa Tenggara, berfokus pada pelestarian tradisi tenun dan ketahanan pangan.',
        type: 'Dewan Region'
      },
      {
        id: 3,
        name: 'Nofriyani Konofo',
        role: 'Dewan Nasional Region Kepulauan-Maluku',
        image: '/images/hero-home.png',
        bio: 'Nofriyani berdedikasi tinggi dalam advokasi perempuan adat pesisir dan wilayah kepulauan Maluku terkait dampak perubahan iklim.',
        type: 'Dewan Region'
      },
      {
        id: 4,
        name: 'Hj. Sitti Johar Karim',
        role: 'Dewan Nasional Region Kepulauan Sulawesi',
        image: '/images/hero-home.png',
        bio: 'Hj. Sitti Johar Karim memimpin perjuangan perempuan adat di Sulawesi dengan fokus pada hak kepemilikan komunal dan perlindungan hutan.',
        type: 'Dewan Region'
      },
      {
        id: 5,
        name: 'Isnah Ayunda',
        role: 'Dewan Nasional Region Kalimantan',
        image: '/images/hero-home.png',
        bio: 'Isnah Ayunda menjadi representasi perempuan adat Kalimantan dalam menghadapi ekspansi industri yang mengancam ruang hidup masyarakat adat.',
        type: 'Dewan Region'
      },
      {
        id: 6,
        name: 'Suparmi',
        role: 'Dewan Nasional Region Jawa',
        image: '/images/hero-home.png',
        bio: 'Suparmi memainkan peran krusial dalam mengorganisir perempuan adat di Jawa yang seringkali kehilangan pengakuan atas identitas adat mereka.',
        type: 'Dewan Region'
      },
      {
        id: 7,
        name: 'Tabitha Mansawan',
        role: 'Dewan Nasional Region Papua',
        image: '/images/hero-home.png',
        bio: 'Tabitha Mansawan berada di garda depan melindungi hak hidup, hutan, dan kebudayaan perempuan adat di tanah Papua.',
        type: 'Dewan Region'
      }
    ];

    const sekretariatData = [
      {
        id: 8,
        name: 'Devi Anggraini',
        role: 'Ketua Umum',
        image: '/images/sekretariat/DSC07833.jpg',
        bio: 'Devi Anggraini terpilih sebagai Ketua Umum PEREMPUAN AMAN...',
        type: 'Dewan Nasional'
      },
      {
        id: 9,
        name: 'Mina Susana Setra',
        role: 'Sekretaris Jenderal',
        image: '/images/hero-home.png',
        bio: 'Mina Susana Setra menjabat sebagai Sekretaris Jenderal...',
        type: 'Sekretariat Nasional'
      },
      {
        id: 10,
        name: 'Syamsul Asinar',
        role: 'Bendahara',
        image: '/images/hero-home.png',
        bio: 'Syamsul Asinar bertanggung jawab atas... ',
        type: 'Sekretariat Nasional'
      }
    ];

    const mitraData = [
      { id: 1, name: "Aliansi Masyarakat Adat Nusantara", logo: "/images/logo/logo_PEREMPUANAMAN-2.png", orderStatus: 1 },
      { id: 2, name: "Yayasan Pemuda Adat Nusantara", logo: "/images/logo.png", orderStatus: 2 },
      { id: 3, name: "Perempuan Nusantara", logo: "/images/logo/logo_PEREMPUANAMAN-2.png", orderStatus: 3 },
      { id: 4, name: "Global Action", logo: "/images/logo.png", orderStatus: 4 },
      { id: 5, name: "SGP Indonesia", logo: "/images/logo/logo_PEREMPUANAMAN-2.png", orderStatus: 5 }
    ];

    const now = new Date();
    
    await queryInterface.bulkInsert(
      'pengurus',
      [...pengurusData, ...sekretariatData].map(p => ({ ...p, createdAt: now, updatedAt: now }))
    );

    await queryInterface.bulkInsert(
      'mitra',
      mitraData.map(m => ({ ...m, createdAt: now, updatedAt: now }))
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('mitra', null, {});
    await queryInterface.bulkDelete('pengurus', null, {});
  }
};
