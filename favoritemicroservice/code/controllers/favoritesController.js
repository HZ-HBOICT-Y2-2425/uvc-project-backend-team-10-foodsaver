import development from '../knexfile.js';
import knex from 'knex';
const db = knex(development);

// add favorite recipes to database
export async function addFavorite(req, res) {
    const { recipe_id } = req.body;

    if (!recipe_id) {
        return res.status(400).json({ error: "Recipe ID is required" });
    }

    try {
        await db('favorites').insert({ recipe_id });
        res.status(201).json({ message: "Favorite added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

// get all favorite recipes from database
export async function getFavorites(req, res) {
    try {
        const favorites = await db('favorites').select('*');
        res.status(200).json(favorites);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

// get all the favorite recipes's IDs
export async function getFavoriteRecipeIds(req, res) {
    try {
        const favoriteRecipes = await db('favorites').select('recipe_id');
        const recipeIds = favoriteRecipes.map((item) => item.recipe_id);
        res.status(200).json(recipeIds);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to retrieve favorite recipe IDs" });
    }
}

// check if a recipe has already exist in database
export async function checkFavorite(req, res) {
    const { recipe_id } = req.params;
  
    try {
      const favoriteRecipeIds = await db('favorites').select('recipe_id');
      const recipeIds = favoriteRecipeIds.map(item => item.recipe_id);
  
      if (recipeIds.includes(Number(recipe_id))) {
        return res.json({ isFavorite: true });
      } else {
        return res.json({ isFavorite: false });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to check favorite status" });
    }
  }

  // remove a favorite recipe from the database
export async function removeFavorite(req, res) {
    const { recipe_id } = req.params;

    if (!recipe_id) {
        return res.status(400).json({ error: "Recipe ID is required" });
    }

    try {
        await db('favorites').where('recipe_id', recipe_id).del();
        res.status(200).json({ message: "Favorite removed successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

