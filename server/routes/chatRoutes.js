const express = require('express');
const router = express.Router();
const { processChat } = require('../controllers/chatController');
const authMiddleware = require('../middleware/auth.middleware');

// Protect chat with auth
router.post('/', authMiddleware, processChat);

module.exports = router;
