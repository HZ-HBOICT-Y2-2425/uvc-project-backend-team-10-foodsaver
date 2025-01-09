const express = require('express');
const { registerUser, loginUser, authenticateToken, getTop50UsersMoneySaved, getTop50UsersCO2Reduced } = require('../controllers/userController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/money-leaderboard', getTop50UsersMoneySaved);
router.get('/co2-leaderboard', getTop50UsersCO2Reduced);
module.exports = router;


