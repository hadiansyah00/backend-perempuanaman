const express = require('express');
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
    if (password) updateData.password = password;

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
