import development from '../knexfile.js';
import knex from 'knex';
const db = knex(development);

// add favorite recipes to database
export async function addFavorite(req, res) {
    const { recipe_id, user_id } = req.body;

    if (!recipe_id || !user_id) {
        return res.status(400).json({ error: "Recipe ID and User ID are required" });
    }

    try {
        await db('favorites').insert({ recipe_id, user_id });
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
    const { user_id } = req.query;

    if (!user_id) {
        return res.status(400).json({ error: "User ID is required" });
    }

    try {
        const favoriteRecipes = await db('favorites')
            .select('recipe_id')
            .where({ user_id });

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
    const { user_id } = req.query;

    if (!recipe_id || !user_id) {
        return res.status(400).json({ error: "Recipe ID and User ID are required" });
    }

    try {
        const favorite = await db('favorites')
            .where({ recipe_id, user_id })
            .first();

        res.json({ isFavorite: !!favorite });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to check favorite status" });
    }
}


// remove a favorite recipe from the database
export async function removeFavorite(req, res) {
    const { recipe_id } = req.params;
    const { user_id } = req.body;

    if (!recipe_id || !user_id) {
        return res.status(400).json({ error: "Recipe ID and User ID are required" });
    }

    try {
        const deletedRows = await db('favorites')
            .where({ recipe_id, user_id })
            .del();

        if (deletedRows > 0) {
            res.status(200).json({ message: "Favorite removed successfully" });
        } else {
            res.status(404).json({ error: "Favorite not found or no permission" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
