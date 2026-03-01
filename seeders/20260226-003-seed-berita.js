'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const now = new Date();

    // Seed 10 articles from beritaData.js (flattened from WordPress format)
    const articles = [
      { id: 1001, slug: 'perempuan-adat-nusantara-membangun-kedaulatan-pangan', title: 'Perempuan Adat Nusantara Membangun Kedaulatan Pangan di Tengah Krisis', date: new Date('2024-05-12T10:00:00'), categoryName: 'Kedaulatan Pangan', excerpt: '<p>Krisis iklim dan pandemi membuktikan bahwa pengetahuan tradisional perempuan adat dalam mengelola wilayah adat dan benih lokal adalah kunci dari ketahanan pangan nasional.</p>', content: '<p>Di tengah pusaran krisis iklim global dan ancaman resesi ekonomi yang menghantui pasca-pandemi, peran perempuan adat sebagai penjaga sistem penyediaan pangan mandiri semakin tidak terbantahkan.</p><h3>Benih Lokal sebagai Simbol Kedaulatan</h3><p>Bagi komunitas masyarakat adat, kedaulatan tidak hanya berarti kebebasan menentukan nasib secara politis, melainkan kebebasan untuk menentukan apa yang akan mereka tanam.</p>', featuredImage: '/images/PAMAN_END_5D3_191027_RUL_0050-scaled.jpg' },
      { id: 1002, slug: 'konsolidasi-nasional-perempuan-aman-2024', title: 'Konsolidasi Nasional PEREMPUAN AMAN 2024: Meneguhkan Langkah Perjuangan', date: new Date('2024-04-20T09:30:00'), categoryName: 'Advokasi & Kebijakan', excerpt: '<p>Ratusan utusan dari berbagai penjuru nusantara berkumpul untuk menyatukan visi dan memperkuat posisi perempuan adat.</p>', content: '<p>Aula utama pertemuan dipenuhi semangat dan antusiasme ratusan utusan yang datang mewakili berbagai komunitas masyarakat adat dari ujung barat hingga timur Nusantara.</p><h3>Fokus Agenda: Percepatan RUU Masyarakat Adat</h3><p>Isu utama yang menjadi sorotan dalam konsolidasi kali ini adalah stagnasi pembahasan RUU Masyarakat Adat.</p>', featuredImage: '/images/hero-home.png' },
      { id: 1003, slug: 'pelatihan-paralegal-perempuan-adat', title: 'Pelatihan Paralegal: Memberdayakan Perempuan Adat untuk Mengakses Keadilan', date: new Date('2024-03-15T14:15:00'), categoryName: 'Pendidikan & Pelatihan', excerpt: '<p>Guna merespon tingginya tingkat perampasan wilayah adat dan kriminalisasi, PEREMPUAN AMAN menggelar pelatihan paralegal.</p>', content: '<p>Dalam lima tahun terakhir, intensitas konflik agraria dan kriminalisasi terhadap warga komunitas adat menunjukkan tren yang sangat memprihatinkan.</p><h3>Membangun Garda Terdepan Pembela HAM</h3><p>Program ini dirancang khusus untuk membekali pemudi dan ibu-ibu di kampung dengan pengetahuan hukum dasar.</p>', featuredImage: '/images/PAMAN_END_5D3_191027_RUL_0045-300x200.jpg' },
      { id: 1004, slug: 'merawat-hutan-merawat-kehidupan', title: 'Merawat Hutan, Merawat Kehidupan: Peran Pengobatan Tradisional', date: new Date('2024-02-10T11:00:00'), categoryName: 'Kesehatan Komunal', excerpt: '<p>Hutan adalah apotek hidup bagi komunitas adat. Pengetahuan mengolah tanaman obat yang diwariskan turun-temurun kini semakin relevan.</p>', content: '<p>Bagi masyarakat adat nusantara, hutan tidak pernah dianggap sekadar kumpulan pepohonan berkayu keras.</p><h3>Dokter Alam dari Kampung</h3><p>Praktik pengobatan tradisional yang diampu oleh tabib, dukun bayi, maupun perempuan penyembuh merupakan warisan literasi kesehatan.</p>', featuredImage: '/images/PAMAN_END_5D3_191027_RUL_0042-300x200.jpg' },
      { id: 1005, slug: 'suara-pemudi-adat-dalam-pemilu', title: 'Suara Pemudi Adat Menggugat Janji Politik Berpihak', date: new Date('2024-01-25T08:45:00'), categoryName: 'Advokasi & Kebijakan', excerpt: '<p>Di tahun politik, pemudi adat tidak lagi mau hanya menjadi objek kampanye. Mereka menuntut komitmen konkret.</p>', content: '<p>Menjelang kontestasi pemilihan umum, narasi-narasi populis dan kunjungan para calon politisi ke wilayah-wilayah perdesaan mulai masif terjadi.</p><h3>Kontrak Politik yang Mengikat</h3><p>Generasi muda masyarakat adat kini bersikap jauh lebih kritis.</p>', featuredImage: '/images/PAMAN_END_5D3_191027_RUL_0045-300x200.jpg' },
      { id: 1006, slug: 'pelestarian-tenun-tradisional-sebagai-identitas', title: 'Pelestarian Tenun Tradisional sebagai Identitas dan Kemandirian Ekonomi', date: new Date('2023-12-05T13:20:00'), categoryName: 'Ekonomi Mandiri', excerpt: '<p>Bukan sekadar kain, tenun adalah lembaran cerita sejarah, spiritualitas, dan identitas.</p>', content: '<p>Gerak ritmis alat tenun gedogan yang berasal dari pelataran rumah-rumah panggung menyuarakan irama kehidupan.</p><h3>Tenun Menjawab Tantangan Ekonomi Global</h3><p>Gerakan Koperasi Perempuan Adat kini memfokuskan revitalisasi sentra-sentra tenun kampung.</p>', featuredImage: '/images/PAMAN_END_5D3_191027_RUL_0050-scaled.jpg' },
      { id: 1007, slug: 'dampak-tambang-terhadap-sumber-air', title: 'Dampak Ekspansi Pertambangan Terhadap Sumber Air Perempuan Adat', date: new Date('2023-11-12T09:00:00'), categoryName: 'Lingkungan & Ekologi', excerpt: '<p>Hilangnya sumber air bersih akibat limbah pertambangan memaksa perempuan adat berjalan lebih jauh setiap harinya.</p>', content: '<p>Eksplorasi proyek ekstraktif berskala raksasa di berbagai provinsi kaya mineral memicu lahirnya malapetaka senyap.</p><h3>Mata Air yang Mengering</h3><p>Kelangkaan air bersih mengamplifikasi derita berlapis bagi kaum perempuan.</p>', featuredImage: '/images/PAMAN_END_5D3_191027_RUL_0042-300x200.jpg' },
      { id: 1008, slug: 'festival-budaya-nusantara', title: 'Festival Budaya Nusantara: Merayakan Keberagaman Bebas dari Stigma', date: new Date('2023-10-28T10:00:00'), categoryName: 'Seni & Budaya', excerpt: '<p>Dalam rangka memperingati Sumpah Pemuda, ratusan pemudi adat menyelenggarakan festival seni.</p>', content: '<p>Bertepatan dengan spirit Sumpah Pemuda, sebuah pagelaran kolosal bertajuk Festival Ekspresi Budaya Nusantara diselenggarakan.</p><h3>Dekonstruksi Stigma Keterbelakangan</h3><p>Ruang kesenian dipilih menjadi arena pertarungan dialektika yang paling ampuh.</p>', featuredImage: '/images/PAMAN_END_5D3_191027_RUL_0045-300x200.jpg' },
      { id: 1009, slug: 'pendidikan-alternatif-untuk-anak-adat', title: 'Membangun Sekolah Alternatif: Meneruskan Pengetahuan Leluhur', date: new Date('2023-09-17T08:30:00'), categoryName: 'Pendidikan & Pelatihan', excerpt: '<p>Sistem pendidikan formal seringkali tercerabut dari realitas kultural masyarakat adat.</p>', content: '<p>Ada sebuah gap krusial antara doktrin sistem sekolah formal sentralistik dengan cara hidup natural masyarakat kultural.</p><h3>Sekolah Beratap Rindang Daun</h3><p>Jejaring Perempuan AMAN merevitalisasi konsepsi ruang belajar melalui model Sekolah Adat.</p>', featuredImage: '/images/hero-home.png' },
      { id: 1010, slug: 'pemetaan-wilayah-adat-partisipatif', title: 'Peran Strategis Perempuan dalam Pemetaan Wilayah Adat Partisipatif', date: new Date('2023-08-05T14:45:00'), categoryName: 'Advokasi & Kebijakan', excerpt: '<p>Dalam proses pemetaan wilayah, partisipasi perempuan menjamin masuknya kawasan-kawasan ruang hidup khas perempuan.</p>', content: '<p>Gerakan masif identifikasi geografis atau pemetaan partisipatif telah menjadi instrumen validitas terukur bagi kedaulatan tanah ulayat.</p><h3>Mengapa Kacamata Feminis Kritis Itu Penting?</h3><p>Persepsi pemanfaatan alam memiliki irisan berbeda bergantung pada interaksi jendernya.</p>', featuredImage: '/images/PAMAN_END_5D3_191027_RUL_0050-scaled.jpg' },
    ];

    await queryInterface.bulkInsert(
      'berita',
      articles.map((a) => ({ ...a, createdAt: now, updatedAt: now }))
    );

    // Seed tags
    const tags = [
      { beritaId: 1001, tag: 'Ketahanan Pangan' },
      { beritaId: 1001, tag: 'Krisis Iklim' },
      { beritaId: 1001, tag: 'Benih Lokal' },
      { beritaId: 1002, tag: 'Konsolidasi' },
      { beritaId: 1002, tag: 'RUU Masyarakat Adat' },
      { beritaId: 1002, tag: 'Perempuan AMAN' },
      { beritaId: 1003, tag: 'Paralegal' },
      { beritaId: 1003, tag: 'Bantuan Hukum' },
      { beritaId: 1003, tag: 'Kriminalisasi' },
      { beritaId: 1004, tag: 'Pengobatan Tradisional' },
      { beritaId: 1004, tag: 'Hutan Adat' },
      { beritaId: 1004, tag: 'Kearifan Lokal' },
      { beritaId: 1005, tag: 'Pemilu' },
      { beritaId: 1005, tag: 'Pemilih Pemula' },
      { beritaId: 1005, tag: 'RUU Masyarakat Adat' },
      { beritaId: 1006, tag: 'Tenun Tradisional' },
      { beritaId: 1006, tag: 'Ekonomi Kreatif' },
      { beritaId: 1006, tag: 'Kemandirian' },
      { beritaId: 1007, tag: 'Tambang' },
      { beritaId: 1007, tag: 'Krisis Air' },
      { beritaId: 1007, tag: 'Konflik Agraria' },
      { beritaId: 1008, tag: 'Festival' },
      { beritaId: 1008, tag: 'Kebudayaan' },
      { beritaId: 1008, tag: 'Pemuda' },
      { beritaId: 1009, tag: 'Sekolah Adat' },
      { beritaId: 1009, tag: 'Pendidikan Alternatif' },
      { beritaId: 1009, tag: 'Pengetahuan Tradisional' },
      { beritaId: 1010, tag: 'Pemetaan' },
      { beritaId: 1010, tag: 'Ruang Hidup' },
      { beritaId: 1010, tag: 'Wilayah Kelola' },
    ];

    await queryInterface.bulkInsert('berita_tags', tags);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('berita_tags', null, {});
    await queryInterface.bulkDelete('berita', null, {});
  },
};
