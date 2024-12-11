import knex from 'knex';
import development from '../knexfile.js';  // Import knex configuration

const db = knex(development);

// Utility to handle the token extraction and user_id retrieval
async function getUserIdFromToken(req) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        throw { status: 401, message: "Access denied. No token provided" };
    }

    // Extract user_id from the token payload
    const decodedToken = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    const { id: user_id } = decodedToken;
    return user_id;
}

// Get all pantry items for a user
export async function getAllItems(req, res) {
    try {
        const user_id = await getUserIdFromToken(req);
        const pantryItems = await db('pantry').where({ user_id });

        // If no items are found, return a helpful message
        if (pantryItems.length === 0) {
            return res.status(404).json({ error: "No pantry items found" });
        }

        res.status(200).json(pantryItems);
    } catch (error) {
        console.error(error);
        res.status(error.status || 500).json({ error: error.message || "Failed to fetch pantry items" });
    }
}

// Add a new pantry item for a user
export async function addItem(req, res) {
    const { name, quantity, expiration_date } = req.body;

    if (!name || !quantity) {
        return res.status(400).json({ error: "All fields (name, quantity, expirationDate) are required!" });
    }

    try {
        const user_id = await getUserIdFromToken(req);
        
        // Clean item data
        const cleanItem = { name, quantity, expiration_date, user_id };

        const [newItem] = await db('pantry').insert(cleanItem).returning('*');

        console.log('Item added successfully:', newItem); // Log the new item data
        
        res.status(201).json({ message: 'Item added to pantry successfully', item: newItem });
    } catch (error) {
        console.error('Error in addItem function:', error);
        res.status(500).json({ error: "Failed to add item", message: error.message });
    }
}

// Update a pantry item for a user
export async function updateItem(req, res) {
    const { id } = req.params;
    const { name, weight, expiration_date } = req.body;

    if (!name || !weight) {
        return res.status(400).json({ error: "All fields (name, weight, expirationDate) are required!" });
    }

    try {
        const user_id = await getUserIdFromToken(req);

        const result = await db('pantry').where({ id, user_id }).update({ name, weight, expiration_date});

        if (result === 0) {
            return res.status(404).json({ error: "Item not found or no permission to update" });
        }

        const updatedItem = await db('pantry').where({ id }).first();
        res.status(200).json({ message: "Item updated successfully", item: updatedItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update pantry item", message: error.message });
    }
}

// Delete a pantry item for a user
export async function deleteItem(req, res) {
    const { id } = req.params;

    try {
        const user_id = await getUserIdFromToken(req);

        const result = await db('pantry').where({ id, user_id }).del();

        if (result === 0) {
            return res.status(404).json({ error: "Item not found or no permission to delete" });
        }

        res.status(200).json({ message: "Item deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete pantry item", message: error.message });
    }
}
