import express from 'express';
import { getFavorites, addFavorite, getFavoriteRecipeIds } from '../controllers/favoritesController.js';

const router = express.Router();

// routes
router.post('/favorites', addFavorite);
router.get('/favorites', getFavorites);
router.get('/favorite-recipe-ids', getFavoriteRecipeIds);

export default router;
