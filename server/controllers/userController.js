const { getUserProfile, updateUser } = require('../models/user.model');
const { sanitizeUser } = require('../utils/sanitize');

async function getProfile(req, res) {
  try {
    const id = req.user.id;
    const profile = await getUserProfile(id);
    
    res.json({
      status: 'success',
      data: sanitizeUser(profile)
    });
  } catch (error) {
    console.error('getProfile Error:', error);
    res.status(500).json({ status: 'error', message: 'Terjadi kesalahan pada server.' });
  }
}

async function updateProfile(req, res) {
  try {
    const id = req.user.id;
    const { name, whatsapp, avatar } = req.body;
    
    // Validasi input dasar
    if (name !== undefined && name.trim().length < 2) {
      return res.status(400).json({ status: 'error', message: 'Nama minimal 2 karakter.' });
    }
    
    const updatedUser = await updateUser(id, { name, whatsapp, avatar });
    
    res.json({
      status: 'success',
      message: 'Profil berhasil diperbarui',
      data: sanitizeUser(updatedUser)
    });
  } catch (error) {
    console.error('updateProfile Error:', error);
    res.status(500).json({ status: 'error', message: 'Terjadi kesalahan pada server.' });
  }
}

module.exports = {
  getProfile,
  updateProfile,
};
