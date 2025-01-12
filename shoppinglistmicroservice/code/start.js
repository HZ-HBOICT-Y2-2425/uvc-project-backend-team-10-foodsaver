import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import shoppingListRouter from './routes/index.js';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 4053;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register routes
app.use('/shopping-lists', shoppingListRouter); // Correct base path for shopping lists

app.listen(port, () => {
  console.log(`Shopping List Server running on port ${port}...`);
});
