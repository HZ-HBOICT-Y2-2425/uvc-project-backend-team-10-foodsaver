
const express = require('express');
const router = express.Router();
const { getTop50Users } = require('../controllers/leaderboardController');

// Define route for leaderboard
router.get('/leaderboard', getTop50Users);

module.exports = router;
