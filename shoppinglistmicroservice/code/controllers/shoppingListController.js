import development from '../knexfile.js';
import knex from 'knex';

// Initialize knex with the development configuration
const db = knex(development);

export const saveShoppingList = async (req, res) => {
  const { userId, shoppingListName, ingredients, recipeTitle, recipeImage } = req.body;

  // Improved validation
  if (!userId || !shoppingListName || !Array.isArray(ingredients) || typeof recipeTitle !== 'string' || typeof recipeImage !== 'string') {
    return res.status(400).json({ error: "Invalid data format." });
  }

  try {
    await db.transaction(async (trx) => {
      const [shoppingListId] = await trx('shopping_lists').insert({
        user_id: userId,
        name: shoppingListName,
        recipe_name: recipeTitle, // Save recipe title
        recipe_image: recipeImage, // Save recipe image
      });

      const itemsToInsert = ingredients.map((item) => ({
        shopping_list_id: shoppingListId,
        name: item.name,
        quantity: item.requiredQuantity,
      }));

      await trx('shopping_list_items').insert(itemsToInsert);
    });

    res.status(201).json({ message: "Shopping list saved successfully." });
  } catch (error) {
    console.error("Error saving shopping list: ", error, req.body);
    res.status(500).json({ error: "Failed to save shopping list." });
  }
};

export const getShoppingLists = async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: "user_id is required" });
  }

  try {
    // Simplified query with join
    const lists = await db('shopping_lists')
      .join('shopping_list_items', 'shopping_lists.id', '=', 'shopping_list_items.shopping_list_id')
      .where({ user_id: userId })
      .select('shopping_lists.id', 'shopping_lists.name', 'shopping_lists.recipe_name', 'shopping_lists.recipe_image', 'shopping_lists.created_at', 'shopping_list_items.name as item_name', 'shopping_list_items.quantity');

    // Group the items under their respective shopping lists
    const result = lists.reduce((acc, list) => {
      const { id, name, recipe_name, recipe_image, created_at, item_name, quantity } = list;
      const existingList = acc.find((item) => item.id === id);

      if (existingList) {
        existingList.items.push({ name: item_name, quantity });
      } else {
        acc.push({
          id,
          name,
          recipe_name,
          recipe_image,
          created_at,
          items: [{ name: item_name, quantity }],
        });
      }

      return acc;
    }, []);

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching shopping lists: ", error);
    res.status(500).json({ error: "Failed to fetch shopping lists." });
  }
};

export const removeShoppingList = async (req, res) => {
  const { id } = req.params;

  try {
    await db.transaction(async (trx) => {
      // Delete items first
      await trx('shopping_list_items')
        .where({ shopping_list_id: id })
        .del();

      // Delete the shopping list
      await trx('shopping_lists')
        .where({ id })
        .del();
    });

    res.status(200).json({ message: "Shopping list removed successfully." });
  } catch (error) {
    console.error("Error removing shopping list: ", error);
    res.status(500).json({ error: "Failed to remove shopping list." });
  }
};
