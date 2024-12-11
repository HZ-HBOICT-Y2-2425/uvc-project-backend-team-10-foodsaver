import knex from 'knex';
import development from '../knexfile.js';  // Import knex configuration
const db = knex(development);

// Utility function to handle token extraction and user_id retrieval
export async function addItem(req, res) {
    const { user_id } = req.query;
    const { name, quantity, expiration_date } = req.body;

    // Validate request body fields
    if (!name || !quantity || !user_id) {
        return res.status(400).json({ error: "Name, quantity, expiration date, and user ID are required" });
    }

    try {
        // Insert the pantry item into the 'pantry' table
        await db('pantry').insert({
            name,
            quantity,
            expiration_date,
            user_id
        });

        // Respond with a 201 status and success message
        res.status(201).json({ message: "Pantry item added successfully" });
    } catch (error) {
        console.error("Error adding item to pantry:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


// Get all pantry items for the logged-in user
export async function getAllItems(req, res) {
    try {
        const { user_id } = req.query;

        // Query the database for pantry items that match the logged-in user's ID
        const pantryItems = await db('pantry').where({ user_id });

        if (pantryItems.length === 0) {
            return res.status(404).json({ error: "No pantry items found" });
        }

        // Return the filtered pantry items for the logged-in user
        res.status(200).json(pantryItems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


// Update a pantry item for a user
export async function updateItem(req, res) {
    const { quantity, expiration_date } = req.body;
    const { user_id } = req.query;
    const { name } = req.params;  // Retrieve name from request parameters

    try {
        const updatedRows = await db('pantry').where({ name, user_id }).update({ quantity, expiration_date });

        if (updatedRows === 0) {
            return res.status(404).json({ error: "Item not found or no permission to update" });
        }

        const updatedItem = await db('pantry').where({ name, user_id }).first();
        res.status(200).json({ message: "Item updated successfully", item: updatedItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


// Delete a pantry item for a user
export async function deleteItem(req, res) {
    const { user_id } = req.query;
    const { name } = req.params;

    try {
        const deletedRows = await db('pantry')
            .where({ name, user_id })
            .del();
        if (deletedRows === 0) {
            return res.status(404).json({ error: "Item not found or no permission to delete" });
        }

        res.status(200).json({ message: "Item deleted successfully", item_name: name });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

