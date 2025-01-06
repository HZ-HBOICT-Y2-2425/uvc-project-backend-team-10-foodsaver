const express = require('express');
const { registerUser, loginUser, authenticateToken, updateUsername, changePassword, incrementRecipeCount } = require('../controllers/userController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/update-username', authenticateToken, updateUsername);
router.post('/change-password', authenticateToken, changePassword);
router.post('/increment-recipe-count', authenticateToken, incrementRecipeCount);


module.exports = router;
