import express from 'express';
import { getFavorites, addFavorite, getFavoriteRecipeIds,checkFavorite } from '../controllers/favoritesController.js';

const router = express.Router();

// routes
router.post('/favorites', addFavorite);
router.get('/favorites', getFavorites);
router.get('/favorite-recipe-ids', getFavoriteRecipeIds);
router.get('/check-favorite/:recipe_id', checkFavorite);

export default router;
