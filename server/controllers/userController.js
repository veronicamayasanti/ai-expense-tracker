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
    res.status(500).json({ status: 'error', message: error.message });
  }
}

async function updateProfile(req, res) {
  try {
    const id = req.user.id;
    const { name, whatsapp, avatar } = req.body;
    
    const updatedUser = await updateUser(id, { name, whatsapp, avatar });
    
    res.json({
      status: 'success',
      message: 'Profil berhasil diperbarui',
      data: sanitizeUser(updatedUser)
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
}

module.exports = {
  getProfile,
  updateProfile,
};
