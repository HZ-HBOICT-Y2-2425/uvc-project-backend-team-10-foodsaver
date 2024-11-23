import express from 'express';
import { getFavorites, addFavorite, getFavoriteRecipeIds,checkFavorite, removeFavorite } from '../controllers/favoritesController.js';

const router = express.Router();

// routes
router.post('/favorites', addFavorite);
router.get('/favorites', getFavorites);
router.get('/favorite-recipe-ids', getFavoriteRecipeIds);
router.get('/check-favorite/:recipe_id', checkFavorite);
router.delete('/favorites/:recipe_id', removeFavorite);

export default router;
