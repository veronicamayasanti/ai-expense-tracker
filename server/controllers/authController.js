const { findUserByEmail, createUser } = require('../models/user.model');
const bcrypt = require('bcryptjs');

async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }
    
    // Check if user already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'Email sudah terdaftar, silakan login' });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const newUser = await createUser({ 
      name, 
      email, 
      password: hashedPassword 
    });
    
    res.status(201).json({
      status: 'success',
      message: 'Registrasi berhasil',
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }
    
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ error: 'Email belum terdaftar' });
    }
    
    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Password salah' });
    }
    
    res.json({
      status: 'success',
      message: 'Login berhasil',
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        whatsapp: user.whatsapp
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  register,
  login,
};
