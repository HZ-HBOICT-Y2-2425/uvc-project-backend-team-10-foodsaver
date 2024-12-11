import express from 'express';
import { getAllItems, addItem, updateItem, deleteItem } from '../controllers/pantryController.js';

const router = express.Router();

// Define the routes for the pantry
router.get('/pantry', getAllItems);   // Get all pantry items for the logged-in user
router.post('/pantry/add', addItem);      // Add an item to the pantry
router.put('/pantry/update/:name', updateItem); // Update an item in the pantry
router.delete('/pantry/delete/:name', deleteItem); // Delete an item from the pantry

export default router;
