// Simple Auth Middleware for simulation
// In a real app, this would verify a JWT token
const { findUserByEmail } = require('../models/user.model');

async function authMiddleware(req, res, next) {
  const userEmail = req.headers['x-user-email']; // For now, we use headers to identify user
  
  if (!userEmail) {
    return res.status(401).json({ error: 'Uauthorized. User email required in headers.' });
  }

  try {
    const user = await findUserByEmail(userEmail);
    if (!user) {
      return res.status(404).json({ error: 'User not found. Please register first.' });
    }
    
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = authMiddleware;
