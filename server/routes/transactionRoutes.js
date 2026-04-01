const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const authMiddleware = require('../middleware/auth.middleware');

router.use(authMiddleware);

router.post('/', transactionController.addTransaction);
router.get('/stats', transactionController.getStats);
router.get('/history', transactionController.getHistory);

module.exports = router;
