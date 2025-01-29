const express = require('express');
const { registerUser, loginUser, authenticateToken, updateUsername, changePassword, incrementRecipeCount, updateUserSavings, getUserSavings, getTop50UsersCO2Reduced, getTop50UsersMoneySaved } = require('../controllers/userController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/update-username', authenticateToken, updateUsername);
router.post('/change-password', authenticateToken, changePassword);
router.post('/increment-recipe-count', authenticateToken, incrementRecipeCount);
router.get('/money-leaderboard', getTop50UsersMoneySaved);
router.get('/co2-leaderboard', getTop50UsersCO2Reduced);
router.get('/:id/savings', getUserSavings);
router.put('/:id/update/savings', updateUserSavings);

module.exports = router;
