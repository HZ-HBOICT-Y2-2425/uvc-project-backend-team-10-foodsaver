import express from 'express';
import cors from 'cors'; // Import CORS middleware
import { saveShoppingList, getShoppingLists } from '../controllers/shoppingListController.js';
import fetch from 'node-fetch';

const app = express();

// Enable CORS with specific configuration (or allow all origins)
const corsOptions = {
  origin: '*', // Allow requests from all origins (use specific domains if needed)
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  allowedHeaders: ['Content-Type'],
};

// Apply the CORS middleware
app.use(cors(corsOptions));

// Middleware to parse JSON bodies
app.use(express.json());

// Shopping list routes
app.post('/shopping-lists', saveShoppingList);
app.get('/shopping-lists', getShoppingLists);

// Proxy route for TheMealDB API
app.get('/proxy/mealdb', async (req, res) => {
  const { ingredient } = req.query;
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data from TheMealDB:', error);
    res.status(500).json({ error: 'Failed to fetch data from TheMealDB.' });
  }
});

// Start the server
app.listen(4052, () => {
  console.log('Server running on http://localhost:4052');
});

export default app;
