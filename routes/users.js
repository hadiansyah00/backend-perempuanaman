const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../models');
const authenticate = require('../middleware/auth');
const authorize = require('../middleware/role');

const router = express.Router();

// ─── GET /api/users ─── (Super Admin only)
router.get('/', authenticate, authorize('super_admin'), async (req, res) => {
  try {
    const users = await db.User.findAll({
      order: [['id', 'ASC']],
    });
    res.json({ data: users });
  } catch (err) {
    console.error('Get users error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ─── POST /api/users ─── (Super Admin only)
router.post('/', authenticate, authorize('super_admin'), async (req, res) => {
  try {
    const { name, email, role, avatar, password } = req.body;
    
    // Check if email already exists
    const existingUser = await db.User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email sudah terdaftar' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await db.User.create({
      name,
      email,
      role: role || 'user',
      avatar,
      password: hashedPassword,
    });

    res.status(201).json({ data: newUser.toJSON() });
  } catch (err) {
    console.error('Create user error:', err);
    res.status(500).json({ error: 'Server error saat membuat user' });
  }
});

// ─── PUT /api/users/:id ─── (Super Admin only)
router.put('/:id', authenticate, authorize('super_admin'), async (req, res) => {
  try {
    const user = await db.User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });

    const { name, email, role, avatar, password } = req.body;
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (role) updateData.role = role;
    if (avatar) updateData.avatar = avatar;
    
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    await user.update(updateData);
    res.json({ data: user.toJSON() });
  } catch (err) {
    console.error('Update user error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ─── DELETE /api/users/:id ─── (Super Admin only)
router.delete('/:id', authenticate, authorize('super_admin'), async (req, res) => {
  try {
    const user = await db.User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });

    // Prevent self-delete
    if (user.id === req.user.id) {
      return res.status(400).json({ error: 'Tidak bisa menghapus akun sendiri' });
    }

    await user.destroy();
    res.json({ message: 'User berhasil dihapus' });
  } catch (err) {
    console.error('Delete user error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
