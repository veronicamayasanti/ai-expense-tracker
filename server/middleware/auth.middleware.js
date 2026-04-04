const { findUserByEmail } = require('../models/user.model');
const fs = require('fs');
const path = require('path');

const debugLog = (msg) => {
  const timestamp = new Date().toISOString();
  fs.appendFileSync(path.join(__dirname, '../server_debug.log'), `[${timestamp}] ${msg}\n`);
};

async function authMiddleware(req, res, next) {
  const userEmail = req.headers['x-user-email'];
  
  if (!userEmail) {
    debugLog('AUTH ERROR: No x-user-email found in headers.');
    return res.status(401).json({ status: 'error', message: 'Unauthorized. User email required in headers.' });
  }

  try {
    const user = await findUserByEmail(userEmail);
    if (!user) {
      debugLog(`AUTH ERROR: User not found for email: ${userEmail}`);
      return res.status(404).json({ status: 'error', message: 'User not found. Please register first.' });
    }
    
    req.user = user;
    next();
  } catch (error) {
    debugLog(`AUTH FATAL ERROR: ${error.message}`);
    res.status(500).json({ status: 'error', message: 'Internal Server Error during auth' });
  }
}

module.exports = authMiddleware;
