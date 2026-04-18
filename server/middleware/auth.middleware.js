const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/env');

async function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>
  
  if (!token) {
    return res.status(401).json({ status: 'error', message: 'Unauthorized. Token required.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Attach token payload directly to req.user — no DB round-trip needed
    req.user = {
      id: decoded.id,
      email: decoded.email,
      name: decoded.name,
    };
    next();
  } catch (error) {
    console.error('Auth Error:', error.message);
    const message = error.name === 'TokenExpiredError' ? 'Token expired' : 'Invalid token';
    res.status(401).json({ status: 'error', message });
  }
}

module.exports = authMiddleware;
