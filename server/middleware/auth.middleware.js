const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/env');
const { findUserByEmail } = require('../models/user.model');

async function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>
  
  if (!token) {
    return res.status(401).json({ status: 'error', message: 'Unauthorized. Token required.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Support both ID and email in payload
    const user = await findUserByEmail(decoded.email);
    
    if (!user) {
      return res.status(404).json({ status: 'error', message: 'User associated with token not found.' });
    }
    
    // Attach sanitised user to request
    const { password, ...userSansPassword } = user;
    req.user = userSansPassword;
    next();
  } catch (error) {
    console.error('Auth Error:', error.message);
    const message = error.name === 'TokenExpiredError' ? 'Token expired' : 'Invalid token';
    res.status(401).json({ status: 'error', message });
  }
}

module.exports = authMiddleware;
