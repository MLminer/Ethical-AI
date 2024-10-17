const express = require('express');
const { createChat } = require('../controllers/chatController');
const router = express.Router();

router.post('/', createChat);

module.exports = router;