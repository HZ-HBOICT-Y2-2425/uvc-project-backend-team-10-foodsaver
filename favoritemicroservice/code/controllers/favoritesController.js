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
        const favorites = await db('favorites').select('*'); // 使用 db 实例
        res.status(200).json(favorites);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

