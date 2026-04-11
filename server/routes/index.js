const express = require('express');
const router = express.Router();
const chatRoutes = require('./chatRoutes');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const transactionRoutes = require('./transactionRoutes');
const twilioRoutes = require('./twilioRoutes');

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/transactions', transactionRoutes);
router.use('/chat', chatRoutes);
router.use('/whatsapp', twilioRoutes);

module.exports = router;
