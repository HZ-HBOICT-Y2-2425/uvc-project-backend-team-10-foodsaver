const express = require('express');
const { registerUser, loginUser, authenticateToken } = require('../controllers/userController');
const { authenticateToken, getAuthenticatedUser } = require('../controllers/userController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// Ruta para obtener los datos del usuario autenticado
router.get('/authenticated-user', authenticateToken, getAuthenticatedUser);

module.exports = router;


