import express from 'express';
import { getFavorites, addFavorite } from '../controllers/favoritesController.js';

const router = express.Router();

// routes
router.post('/favorites', addFavorite);
router.get('/favorites', getFavorites);

export default router;
