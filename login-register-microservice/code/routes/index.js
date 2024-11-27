// const express = require('express');
// const { registerUser, loginUser, authenticateToken } = require('../controllers/userController');

const express = require('express');
const { registerUser, loginUser, authenticateToken } = require('../controllers/userController');

const router = express.Router();
// index.js (rutas del backend)

const { getUser } = require('./controller');  // Asegúrate de importar la función

router.get('/user', getUser);  // Ruta para obtener el nombre del usuario



router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;


