'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const galleryData = [
      {
        title: "Panen Padi Tradisional",
        category: "Kedaulatan Pangan",
        src: "/images/PAMAN_END_5D3_191027_RUL_0050-scaled.jpg",
        alt: "Perempuan adat memanen padi dengan alat potong tradisional ani-ani di sawah",
        type: "Photo"
      },
      {
        title: "Pemetaan Wilayah Adat",
        category: "Advokasi & Kebijakan",
        src: "/images/PAMAN_END_5D3_191027_RUL_0045-300x200.jpg",
        alt: "Dialog pemetaan wilayah adat secara partisipatif bersama tetua kampung",
        type: "Photo"
      },
      {
        title: "Perlindungan Sumber Air Bersih",
        category: "Lingkungan & Ekologi",
        src: "/images/PAMAN_END_5D3_191027_RUL_0042-300x200.jpg",
        alt: "Sumber mata air jernih di kawasan lindung hutan adat",
        type: "Photo"
      },
      {
        title: "Konsolidasi Perempuan AMAN",
        category: "Pertemuan Nasional",
        src: "/images/hero-home.png",
        alt: "Kegiatan konsolidasi dan musyawarah perempuan adat tingkat nasional",
        type: "Photo"
      },
      {
        title: "Ritual Doa Syukur Bumi",
        category: "Seni & Budaya",
        src: "/images/PAMAN_END_5D3_191027_RUL_0050-scaled.jpg",
        alt: "Prosesi ritual bersyukur atas limpahan panen tahunan",
        type: "Photo"
      },
      {
        title: "Pelatihan Paralegal Pemudi",
        category: "Pendidikan & Pelatihan",
        src: "/images/PAMAN_END_5D3_191027_RUL_0045-300x200.jpg",
        alt: "Diskusi aktif dalam sesi kelas pelatihan paralegal untuk kader perempuan",
        type: "Photo"
      },
      {
        title: "Merawat Hutan Tanaman Obat",
        category: "Kesehatan Komunal",
        src: "/images/PAMAN_END_5D3_191027_RUL_0042-300x200.jpg",
        alt: "Apotek hidup di pekarangan rumah komunal masyarakat adat",
        type: "Photo"
      },
      {
        title: "Kedaulatan Benih Lokal",
        category: "Kedaulatan Pangan",
        src: "/images/PAMAN_END_5D3_191027_RUL_0050-scaled.jpg",
        alt: "Tumpukan benih padi varietas lokal nusantara",
        type: "Photo"
      }
    ];

    const videoData = {
      title: "Peran Perempuan Adat dalam Penjagaan, Penyebaran dan Pewarisan Pengetahuan Masyarakat Adat",
      youtubeUrl: "https://www.youtube.com/embed/N1icc_fN5GE?si=bTlzk8cnR7SVUByU",
      alt: "Dokumentasi peran perempuan adat",
      type: "Video"
    };

    const mediaRecords = [...galleryData, videoData];
    const now = new Date();
    
    await queryInterface.bulkInsert(
      'media_gallery',
      mediaRecords.map((item) => ({
        ...item,
        createdAt: now,
        updatedAt: now
      }))
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('media_gallery', null, {});
  }
};
