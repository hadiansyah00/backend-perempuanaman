const express = require('express');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const db = require('../models');
const authenticate = require('../middleware/auth');
const authorize = require('../middleware/role');

const router = express.Router();

// ─── Validation Schemas ───
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
});

const registerSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('super_admin', 'admin', 'writer', 'user').default('user'),
  avatar: Joi.string().optional(),
});

// ─── Helpers ───
const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '15m' }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user.id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' }
  );
};

// ─── POST /api/auth/login ───
router.post('/login', async (req, res) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const user = await db.User.findOne({ where: { email: value.email } });
    if (!user) return res.status(401).json({ error: 'Email atau password salah' });

    const isValid = await user.comparePassword(value.password);
    if (!isValid) return res.status(401).json({ error: 'Email atau password salah' });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Save refresh token
    await user.update({ refreshToken });

    res.json({
      accessToken,
      refreshToken,
      user: user.toJSON(),
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ─── POST /api/auth/register (super_admin only) ───
router.post('/register', authenticate, authorize('super_admin'), async (req, res) => {
  try {
    const { error, value } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const existing = await db.User.findOne({ where: { email: value.email } });
    if (existing) return res.status(409).json({ error: 'Email sudah terdaftar' });

    const user = await db.User.create(value);
    res.status(201).json({ user: user.toJSON() });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ─── POST /api/auth/refresh ───
router.post('/refresh', async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ error: 'Refresh token diperlukan' });

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await db.User.findByPk(decoded.id);

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(401).json({ error: 'Refresh token tidak valid' });
    }

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);
    await user.update({ refreshToken: newRefreshToken });

    res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
  } catch (err) {
    return res.status(401).json({ error: 'Refresh token expired atau tidak valid' });
  }
});

// ─── GET /api/auth/me ───
router.get('/me', authenticate, async (req, res) => {
  res.json({ user: req.user.toJSON() });
});

// ─── PUT /api/auth/me ───
router.put('/me', authenticate, async (req, res) => {
  try {
    const updateSchema = Joi.object({
      name: Joi.string().min(2).max(100),
      avatar: Joi.string(),
      password: Joi.string().min(6),
    });

    const { error, value } = updateSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    await req.user.update(value);
    res.json({ user: req.user.toJSON() });
  } catch (err) {
    console.error('Update profile error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ─── POST /api/auth/logout ───
router.post('/logout', authenticate, async (req, res) => {
  try {
    await req.user.update({ refreshToken: null });
    res.json({ message: 'Berhasil logout' });
  } catch (err) {
    console.error('Logout error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
