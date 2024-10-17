const express = require('express');
const { createVote } = require('../controllers/voteController');
const router = express.Router();

router.post('/', createVote);

module.exports = router;