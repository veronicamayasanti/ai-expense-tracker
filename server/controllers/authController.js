const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRES_IN } = require('../config/env');
const { findUserByEmail, createUser } = require('../models/user.model');
const bcrypt = require('bcryptjs');

// Helper to sanitize user object
const sanitizeUser = (user) => {
  const { password, ...userSansPassword } = user;
  return userSansPassword;
};

// Helper to generate JWT
const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ status: 'error', message: 'Name, email, and password are required' });
    }
    
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ status: 'error', message: 'Email sudah terdaftar, silakan login' });
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const newUser = await createUser({ 
      name, 
      email, 
      password: hashedPassword 
    });
    
    const token = generateToken(newUser);
    
    res.status(201).json({
      status: 'success',
      message: 'Registrasi berhasil',
      data: {
        token,
        user: sanitizeUser(newUser)
      }
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ status: 'error', message: 'Email and password required' });
    }
    
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ status: 'error', message: 'Email belum terdaftar' });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ status: 'error', message: 'Password salah' });
    }
    
    const token = generateToken(user);
    
    res.json({
      status: 'success',
      message: 'Login berhasil',
      data: {
        token,
        user: sanitizeUser(user)
      }
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
}

module.exports = {
  register,
  login,
};
