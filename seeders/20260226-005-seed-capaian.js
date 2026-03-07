'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const rawData = [
      {
        id: 1,
        title: "Perluasan Ruang Hidup",
        description: "Memperluas dan menjamin pengakuan wilayah adat sebagai ruang hidup komunal...",
        headers: ["Region", "Capaian", "Capaian 2021-2024", "Target Paska Rakernas (2024-2026)"],
        rows: [
          { data: ["Sumatera", "Membentuk: 10 WP, 256 Anggota", "Terbentuknya 5 WP, 141 Anggota", "Membentuk: 5 WP, 115 Anggota"] },
          { data: ["Kalimantan", "Membentuk: 27 WP, 945 Anggota", "Terbentuknya 10 WP, 400 Anggota", "Membentuk: 17 WP, 545 Anggota"] },
          { data: ["Sulawesi", "Membentuk: 25 WP, 735 Anggota", "Terbentuknya 2 WP, 62 Anggota", "Membentuk: 23 WP, 673 Anggota"] },
          { data: ["Jawa", "Membentuk: 2 WP, 60 Anggota", "Terbentuknya 1 WP, 32 Anggota", "Membentuk: 1 WP, 28 Anggota"] },
          { data: ["Bali Nusa Tenggara", "Membentuk: 10 WP, 300 Anggota", "Terbentuknya 8 WP, 274 Anggota", "Membentuk: 2 WP, 50 Anggota"] },
          { data: ["Kepulauan Maluku", "Membentuk: 7 WP, 285 Anggota", "Terbentuknya 2 WP, 57 Anggota", "Membentuk: 5 WP, 228 Anggota"] },
          { data: ["Papua", "Membentuk: 60 WP, 1.640 Anggota", "Terbentuknya 11 WP, 344 Anggota", "Membentuk: 33 WP, 825 Anggota"] },
        ]
      },
      {
        id: 2,
        title: "Tujuan Strategis 2",
        description: "Membangun Kelembagaan Dan Kepemimpinan Perempuan Adat Yang Kuat Melalui Peningkatan Kapasitas",
        headers: ["Region", "Target (2021-2026)", "Capaian"],
        rows: [
          { data: ["Sumatera", "1 Perdes tentang Pengakuan Hak Kolektif Perempuan Adat di Desa Amplas", "Masih dalam proses diskusi dengan Pemdes"] },
          { data: ["Kalimantan", "5 Perda Pengakuan MA", "4 Pengakuan MA"] },
          { data: ["Kalimantan", "10 SK Pengakuan MA", "2 Perdes terkait Masalah Pengelolaan Pemberdayaan Perempuan Adat"] },
          { data: ["Kalimantan", "12 Perdes terkait Masalah Pengelolaan Pemberdayaan Perempuan Adat", "2 Perdes Wilayah Kelola Perempuan Adat"] },
          { data: ["Kalimantan", "12 Perdes tentang Wilayah Kelola Perempuan Adat", ""] },
          { data: ["Sulawesi", "1 Perda (Kab. Majene)", "1 Perda (Kab. Majene)"] },
          { data: ["Sulawesi", "2 Perdes (Kajang dan Turilenrang)", "1 SK Bupati Sinjai"] },
          { data: ["Sulawesi", "1 SK Bupati", ""] },
          { data: ["Sulawesi", "2 SK Hutan Adat", ""] },
          { data: ["Jawa", "Perda Masyarakat Adat", "Mengawal Perda Masyarakat Adat"] },
          { data: ["Bali Nusa Tenggara", "20 Kader PA (Ketua Karang Taruna, BPD, Majelis Kerama Desa, Staf Desa, Kepala Desa, DPRD)", "Belum Tercapai"] },
          { data: ["Bali Nusa Tenggara", "70 Kader perempuan mewakili Musrembang, Gendurasa Siu Ate Sopok Angen", ""] },
          { data: ["Maluku", "Perda Pengakuan Masayarakat Adat", "1 Perda Pengakuan Masayarakat Adat di Kepulauan Aru"] },
          { data: ["Papua", "28 SK Pengakuan Kampung Adat", "9 SK Pengakuan Kampung Adat dari wilayah adat SK Bupati no. 319"] },
          { data: ["Papua", "1 Peraturan Wali Kota", "1 Peraturan Wali Kota"] },
          { data: ["Papua", "", "1 SK Hutan Perempuan"] }
        ]
      },
      {
        id: 3,
        title: "Tujuan Strategis 3",
        description: "",
        headers: ["Region", "Target (2021-2026)", "Capaian 2021-2024", "Target Paska Rakernas (2024-2026)"],
        rows: [
          { data: ["Sumatera", "1 kader Kepala Dusun di dusun Batu Gajah", "3 kader Pemdes (PHKom Natumingka)", ""] },
          { data: ["Sumatera", "1 kader anggota DPRD kab. Langkat", "", ""] },
          { data: ["Sumatera", "1 kader anggota DPRD kota Medan", "", ""] },
          { data: ["Sumatera", "1 kader anggota DPD", "", ""] },
          { data: ["Kalimantan", "6 kader di BPD", "1 kader BPK", "21 kader BPD"] },
          { data: ["Kalimantan", "12 kader Kepala Desa", "4 kader BPD", "4 kader Kades"] },
          { data: ["Kalimantan", "6 kader Lembaga Adat", "5 kader Pengurus Adat", "5 kader Pengurus Adat"] },
          { data: ["Sulawesi", "66 Kader Pemimpin PEREMPUAN AMAN", "1 kader calon DPRD Enrekang", ""] },
          { data: ["Sulawesi", "5 kader Perempuan Adat di posisi strategis (DPR, DPD, Kepala Desa)", "2 kader sebagai DPRD Mamasa (Sulawesi Barat)", ""] },
          { data: ["Sulawesi", "", "1 kader sebagai DPRD (PHKom Tandukulua)", ""] },
          { data: ["Sulawesi", "", "1 kader Pemdes (PHD Masrempulu)", ""] },
          { data: ["Sulawesi", "", "2 kader Pemdes (Sulawesi Barat)", ""] },
          { data: ["Jawa", "10 kader Perempuan Adat", "1 calon kepala desa", "15 orang"] },
          { data: ["Jawa", "", "Staf desa", ""] },
          { data: ["Jawa", "", "Lembaga adat", ""] },
          { data: ["Jawa", "", "BPD", ""] },
          { data: ["Jawa", "", "Pegawai daerah", ""] },
          { data: ["Bali Nusa Tenggara", "50 wakil perempuan adat di berbagai Lembaga desa: Ketua Karang Taruna, BPD, MKD, Staf Desa, Kepala Desa, DPR", "20 kader posisi strategis", ""] },
          { data: ["Maluku", "20 kader Perempuan Adat", "Lebih dari 20 kader Calon legislative dan BPD", ""] },
          { data: ["Papua", "60 kader pemimpin (Kepala Kampung, BAMUSKAM, Caleg, MRP, SEKDA, Calon Bupati)", "3 kader kepala kampung", "Caleg = 5 orang"] },
          { data: ["Papua", "", "5 kader Bamuskan", "MRP = 1 orang"] },
          { data: ["Papua", "", "", "Sekda = 1 orang"] }
        ]
      },
      {
        id: 4,
        title: "Tujuan Strategis 4",
        description: "",
        headers: ["Region", "Target (2021-2026)", "Capaian 2021-2024", "Target Paska Rakernas (2024-2026)"],
        rows: [
          { data: ["Sumatera", "5 Kebun kolektif (Tanjung Mulia, Menteng, PHD Deli, 2 Tano Batak)", "1 kebun kolektif (PHKom Sihaporas)", ""] },
          { data: ["Sumatera", "1 Art Shop di Menteng", "2 Art Shop (PHKom Natumingka 1 dan PHKom Sihaporas 1)", ""] },
          { data: ["Sumatera", "3 Sekolah Adat di PHD Langkat, Menteng dan Manggusta", "2 Sekolah Adat (PHKom Natumingka 1 dan 1 PHKom Sihaporas", ""] },
          { data: ["Kalimantan", "7 program kedaulatan pangan (Sekatak, Paser, BPP, HST, Bartim, Rangan, Anggrek Mandiri)", "8 Kebun kolektif", "8 kebun kolektif"] },
          { data: ["Kalimantan", "10 gerai/ artshop/rumah produksi", "(PHKom Sebalos 1, PHD Paser 1, PHD Loubawe 1, PHD Bartim 1, PHKom Dawar 1, PHKom Tilung Indung 2, PHKom Maragut 1, PHKom Bolum Bawe Balik 1)\nGerai: 3 Art shop\nPHD Sekatak=1\nPHD Tilung indung=1\nPHD Paser=1", "21 Art shop"] },
          { data: ["Sulawesi", "10 kelompok ekonomi yg akan dibangun", "3 kebun kolektif dari PHKom Patongloan", ""] },
          { data: ["Sulawesi", "10 + 9 (yg sudah ada) pelatihan manjemen usaha, kelembagaan ekonomi, keterampilan)", "1 Gerai Gemas (PHD Masrempulu)", ""] },
          { data: ["Jawa", "1 kelompok untuk mengurus pupuk organik dan pakan ayam", "1 kelompok Pupuk Organik", "4 Kelompok usaha (PHD Osing)"] },
          { data: ["Bali Nusa Tenggara", "10 kelompok usaha pengelolaan SDA (kuliner, kerajinan *kolaborasi usaha kelompok antar wilayah", "6 Kelompok usaha produk\n(PHKom Montong Baan= 1, \nPHKom Mondok=1, \nPHKom Bayan =3,\nPHD Lombok Tengah =1)\nKebun Kolektif;1 (PHKom Mudegagi)\nSanggar Seni: PHKom Bayan=1", ""] },
          { data: ["Maluku", "Kebun di PHD Makelega", "1 kelompok usaha (PHKom Natalutur)", "1 Budidaya perikanan"] },
          { data: ["Maluku", "Pengolahan gula merah di Honitetu", "2 kelompok usaha (PHD Kep Aru)", ""] },
          { data: ["Maluku", "Keripik singkong di Komunitas Mumulati", "1 Kebun Kolektif (PHkom Morodina)", ""] },
          { data: ["Maluku", "", "1 Sanggar Seni", ""] },
          { data: ["Papua", "11 Kelompok Ekonomi Kolektif (Kebun kolektif, kelompok noken, batik, aksesoris, olahan ikan, sanggar untuk hasil kelompok)", "11 kelompok Ekonomi Kolektif\n8 Kebun Kolektif\n8 kelompok kerajianan tangan\n8 kelompok kuliner\n8 Sekolah Adat (2 di PHD Deponsoro dan 6 di PHKom)\n1 Sekolah Lapang (PHKom Sawesuma)\n1 Sekolah Alam (PHKom Ibayauw)", "4 rumah produksi"] }
        ]
      },
      {
        id: 5,
        title: "Tujuan Strategis 5",
        description: "Memobilisasi Perempuan Adat Pemimpin Untuk Merespon Berbagai Ancaman Yang Muncul Dari Kebijakan Pembangunan Yang Tidak Berpihak Pada Masyarakat Adat.",
        headers: ["Region", "Target (2021-2026)", "Capaian 2021-2024", "Target Paska Rakernas (2024-2026)"],
        rows: [
          { data: ["Sumatera", "30 - 50 kader pemimpin Perempuan Adat", "43 kader menjadi pemimpin Perempuan Adat di komunitas masing-masing\nPHKom Sihaporas = 6\nPHKom Natumingka= 6\nPHKom Siabal-Abal=4\nPHKom Tanjung Mulia=7\nPHD Langkat=5\nPHKom Menteng= 5\nPHD Deli = 7", ""] },
          { data: ["Kalimantan", "72 Kader Pararegal\n2 Kader Pendidikan\n4 Kader di lembaga adat\n2 Kader Pemerintah desa\n1 Pendokumentasian pengetahuan perempuan Solongpenias (HAKI)\n3 Pendokumentasian obat-obatan tradisional (BBB, Paser, 3 Calon WP)", "26 kader paralegal\n6 kader pendidikan\n2 kader pendokumentasian", "21 kader paralegal\n21 kader pemimpin\n21 kader pemdes\n21 pendokumentasian obat-obatan\n21 kader ekonomi kreatif\n21 kader jurnalistik"] },
          { data: ["Sulawesi", "1 kesepakatan antara organisasi PEREMPUAN AMAN dengan stakeholder untuk mencabut kebijakan yang tidak berpihak pada MA", "2 Kesepakatan Aspirasi dengan Aspirasi Kesepakatan Sipil", ""] },
          { data: ["Jawa", "", "2 Kaderr Pemimpin\n5 Kader Pemula\n1 kader Paralegal", "Pentas Seni Budayaya\nPendokumentasian tempat ritual dan makanan ritual\nPendokumentasian motif batik\nPendokumentasian perwarnaan alam batik"] },
          { data: ["Bali Nusa Tenggara", "5 Dokumen/ Data (sertifikat tanah adat, cerita sejarah adat, kamus Bahasa)\n10 kader yg akan mengawal kasus pernikahan anak umur di lingkungan Masyarakat Adat", "1 Dokumen mitigasi resiko yang akan di dorong ke pemdes", "Perda pengembangan wilayah\nPembangunan waduk Lambo"] },
          { data: ["Maluku", "Terdapat kesadaran kritis tentang kebijakan yang tidak berpihak", "3 Kader Paralegal (Makalega, Masohi dan Kepulauan Aru)\n1 Kader Pendidikan", ""] },
          { data: ["Papua", "60 kader pemimpin (Kepala Kampung, Bamuskan, Caleg, MRP, Damanas, Sekda, Calon Bupati)", "3 Kepala Kampung", "Caleg: 5 orang\nMRP: 1 orang\nDamanas:1 orang\nSekda: 1 orang\nCalon Bupati:1 orang"] }
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
