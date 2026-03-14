const { MediaGallery } = require('./models');
const fs = require('fs');
const path = require('path');

async function restore() {
  const dirsToScan = [
    { type: 'images', dbType: 'Photo' },
    { type: 'docs', dbType: 'Document' }
  ];
  
  const records = [];

  for (const dir of dirsToScan) {
    const targetDir = path.join(__dirname, 'uploads', dir.type);
    
    if (!fs.existsSync(targetDir)) {
      console.log(`Folder uploads/${dir.type} tidak ditemukan, melewati...`);
      continue;
    }
    
    const files = fs.readdirSync(targetDir);
    
    for (const file of files) {
      if (file === '.' || file === '..') continue;
      
      const srcPath = `/uploads/${dir.type}/${file}`;
      const existing = await MediaGallery.findOne({ where: { src: srcPath } });
      
      if (!existing) {
        records.push({
          title: file.split('-')[0].replace(/_/g, ' '), // Membuat judul dari nama file default
          category: 'Umum',
          src: srcPath,
          type: dir.dbType,
          alt: file
        });
      }
    }
  }
  
  if (records.length > 0) {
    await MediaGallery.bulkCreate(records);
    console.log(`Berhasil memulihkan ${records.length} file (Gambar & PDF) ke Media Gallery.`);
  } else {
    console.log('Tidak ada file baru yang perlu dipulihkan.');
  }
}

restore().then(() => process.exit(0)).catch(err => {
  console.error(err);
  process.exit(1);
});
