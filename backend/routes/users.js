const { verifyToken, isAdmin } = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', verifyToken, isAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password'); // oculta senhas
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
});

module.exports = router;
