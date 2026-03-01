const express = require('express');
const path = require('path');
const fs = require('fs');
const upload = require('../middleware/upload');
const authenticate = require('../middleware/auth');
const authorize = require('../middleware/role');
const { MediaGallery } = require('../models');

const router = express.Router();

// ─── POST /api/upload ───
// Standard approach: Upload file to disk AND auto-register in gallery DB.
// Accepts optional form fields: alt, title, category
router.post('/', authenticate, authorize('super_admin', 'admin', 'writer'), upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'File tidak ditemukan' });
    }

    const ext = path.extname(req.file.originalname).toLowerCase();
    const isDoc = ['.pdf', '.doc', '.docx'].includes(ext);
    const isImage = req.file.mimetype.startsWith('image/');
    const subDir = isDoc ? 'docs' : 'images';
    const fileUrl = `/uploads/${subDir}/${req.file.filename}`;
    console.log(`[Upload Debug] originalname: ${req.file.originalname}, ext: ${ext}, isDoc: ${isDoc}, isImage: ${isImage}`);

    // Optional metadata from form fields
    const altText = req.body.alt || req.file.originalname.split('.')[0];
    const title = req.body.title || req.file.originalname;
    const category = req.body.category || null;

    let galleryEntry = null;

    // Auto-register images and docs into the media_gallery table
    if (isImage || isDoc) {
      galleryEntry = await MediaGallery.create({
        title: title,
        src: fileUrl,
        alt: altText,
        type: isImage ? 'Photo' : 'Document',
        category: category,
      });
    }

    res.status(201).json({
      url: fileUrl,
      filename: req.file.filename,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      // Include gallery info if the file was auto-registered
      gallery: galleryEntry ? {
        id: galleryEntry.id,
        title: galleryEntry.title,
        alt: galleryEntry.alt,
        type: galleryEntry.type,
      } : null,
    });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Upload gagal' });
  }
});

// ─── DELETE /api/upload/:filename ───
router.delete('/:filename', authenticate, authorize('super_admin', 'admin'), async (req, res) => {
  const { filename } = req.params;

  // Try both directories
  const dirs = ['images', 'docs'];
  let found = false;

  for (const dir of dirs) {
    const filePath = path.join(process.env.UPLOAD_DIR || './uploads', dir, filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      found = true;

      // Also remove from gallery DB if exists
      try {
        await MediaGallery.destroy({
          where: { src: `/uploads/${dir}/${filename}` }
        });
      } catch (dbErr) {
        console.error('Could not remove gallery DB entry:', dbErr);
      }

      return res.json({ message: 'File berhasil dihapus' });
    }
  }

  if (!found) {
    return res.status(404).json({ error: 'File tidak ditemukan' });
  }
});

module.exports = router;
