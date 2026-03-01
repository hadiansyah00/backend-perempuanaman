'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const pustakaData = [
      {
        id: 1,
        slug: "community-action-global-impact",
        title: "Community Action Global Impact",
        description: "Buku ini mendokumentasikan aksi-aksi komunitas perempuan adat di seluruh Nusantara yang telah memberikan dampak signifikan tidak hanya di tingkat lokal, tetapi juga berkontribusi pada pencapaian tujuan global dalam pelestarian lingkungan hidup dan mitigasi perubahan iklim.",
        image: "/images/hero-home.png",
        pdfUrl: "/docs/1.-STATUTA-PEREMPUAN-AMAN-2021-2026_Rev.pdf",
        publishedYear: 2023,
        pages: 45
      },
      {
        id: 2,
        slug: "tujuan-pembangunan-berkelanjutan",
        title: "Tujuan Pembangunan Berkelanjutan",
        description: "Laporan analisis mengenai bagaimana hak-hak dan kearifan lokal perempuan adat selaras dengan pilar-pilar Tujuan Pembangunan Berkelanjutan (SDGs), khusus pada aspek kesetaraan gender dan aksi iklim.",
        image: "/images/PAMAN_END_5D3_191027_RUL_0050-scaled.jpg",
        pdfUrl: "/docs/1.-STATUTA-PEREMPUAN-AMAN-2021-2026_Rev.pdf",
        publishedYear: 2022,
        pages: 60
      },
      {
        id: 3,
        slug: "no-hunger-and-poverty",
        title: "No Hunger and Poverty",
        description: "Kajian mendalam mengenai sistem pangan lokal yang dijaga oleh perempuan adat sebagai tameng utama komunitas dalam menghadapi ancaman krisis pangan dan kemiskinan struktural.",
        image: "/images/PAMAN_END_5D3_191027_RUL_0045-300x200.jpg",
        pdfUrl: "/docs/1.-STATUTA-PEREMPUAN-AMAN-2021-2026_Rev.pdf",
        publishedYear: 2021,
        pages: 35
      },
      {
        id: 4,
        slug: "kertas-kebijakan-hak-kolektif",
        title: "Kertas Kebijakan Hak Kolektif",
        description: "Rekomendasi kebijakan yang disusun berdasarkan hasil musyawarah nasional, mendesak pengakuan penuh atas hak kolektif perempuan adat atas tanah, wilayah, dan sumber daya alam.",
        image: "/images/PAMAN_END_5D3_191027_RUL_0042-300x200.jpg",
        pdfUrl: "/docs/1.-STATUTA-PEREMPUAN-AMAN-2021-2026_Rev.pdf",
        publishedYear: 2024,
        pages: 28
      },
      {
        id: 5,
        slug: "panduan-pengorganisasian-komunitas",
        title: "Panduan Pengorganisasian",
        description: "Buku pegangan bagi kader lapangan Perempuan Aman dalam memfasilitasi pertemuan, mengorganisir komunitas tingkat tapak, dan merumuskan strategi advokasi bersama.",
        image: "/images/hero-home.png",
        pdfUrl: "/docs/1.-STATUTA-PEREMPUAN-AMAN-2021-2026_Rev.pdf",
        publishedYear: 2020,
        pages: 80
      },
      {
        id: 6,
        slug: "laporan-tahunan-2023",
        title: "Laporan Tahunan 2023",
        description: "Laporan komprehensif mengenai capaian kerja, program, dan keuangan Persekutuan Perempuan Adat Nusantara (PEREMPUAN AMAN) di sepanjang tahun 2023.",
        image: "/images/PAMAN_END_5D3_191027_RUL_0050-scaled.jpg",
        pdfUrl: "/docs/1.-STATUTA-PEREMPUAN-AMAN-2021-2026_Rev.pdf",
        publishedYear: 2024,
        pages: 120
      }
    ];

    const tuturData = [
      {
        id: 1,
        title: "Imajinasikan Dunia Yang Setara",
        coverImage: "/images/hero-home.png",
        audioEmbedHtml: `<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1229712391&color=%23965596&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>`,
        description: `Press release kegiatan "Imajinasikan Dunia Yang Setara" yang telah diadakan oleh kegiatan Teras Mitra dalam rangkaian Hari Perempuan Internasional (12/3/2022). Devi Anggraini, Ketua Umum menyampaikan bahwa berbicara mengenai tema IWD tahun ini #BreakTheBias, ruang domestic adalah kekuatan dan sangat politis. Mari kawan-kawan perempuan kita harus hapuskan stigma bahwa Ruang domestic itu adalah kelemahan perempuan. Mari kita balik "Domestic space is Power, is Political!"`
      },
      {
        id: 2,
        title: "Suara Perempuan Adat Menjaga Hutan",
        coverImage: "/images/PAMAN_END_5D3_191027_RUL_0050-scaled.jpg",
        audioEmbedHtml: `<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1148674558&color=%23965596&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>`,
        description: `Dalam episode podcast ini, kita mendengarkan kisah langsung dari kelompok perempuan adat di wilayah konservasi yang berjuang mempertahankan hak ulayatnya dari ancaman ekspansi industri ekstraktif. Simak bagaimana mereka menggunakan pengetahuan tradisional untuk menjaga kelestarian mata air dan keragaman hayati hutan rimba.`
      },
      {
        id: 3,
        title: "Pendidikan Kritis Melalui Sekolah Adat",
        coverImage: "/images/PAMAN_END_5D3_191027_RUL_0045-300x200.jpg",
        audioEmbedHtml: `<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1028374828&color=%23965596&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>`,
        description: `Berbincang santai bersama penggerak pemudi adat yang mendirikan inisiatif "Sekolah Adat" di kampung halamannya. Mereka menjabarkan pentingnya kurikulum berbasis lokalitas dan transmisi pengetahuan leluhur kepada generasi muda untuk mencegah krisis identitas kultural di era digital.`
      }
    ];

    const now = new Date();
    
    await queryInterface.bulkInsert(
      'pustaka',
      pustakaData.map(p => ({ ...p, createdAt: now, updatedAt: now }))
    );

    await queryInterface.bulkInsert(
      'suara_perempuan',
      tuturData.map(s => ({ ...s, createdAt: now, updatedAt: now }))
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('suara_perempuan', null, {});
    await queryInterface.bulkDelete('pustaka', null, {});
  }
};
