import express from 'express';
import { registerUser, loginUser, getAuthenticatedUser } from '../controllers/userController.js';
import { authenticateToken } from '../middleware/middleware.js';

const router = express.Router();


router.post('/register', registerUser);
router.post('/login', loginUser);

// Ruta para obtener los datos del usuario autenticado
router.get('/authenticated-user', authenticateToken, getAuthenticatedUser );
export default router;


