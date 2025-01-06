const express = require('express');
const { registerUser, loginUser, authenticateToken, getTop50Users } = require('../controllers/userController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/leaderboard', getTop50Users);
module.exports = router;


