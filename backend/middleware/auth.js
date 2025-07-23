// middleware/auth.js

const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(403).json({ error: 'Token não fornecido.' });

  const token = authHeader.replace('Bearer ', '');

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Token inválido.' });

    req.userId = decoded.id;
    req.userRole = decoded.role || decoded.tipo;
    next();
  });
};

// ✅ Adicione isso:
const isAdmin = (req, res, next) => {
  if (req.userRole !== 'admin') {
    return res.status(403).json({ error: 'Acesso negado: apenas admin' });
  }
  next();
};

module.exports = { verifyToken, isAdmin };
