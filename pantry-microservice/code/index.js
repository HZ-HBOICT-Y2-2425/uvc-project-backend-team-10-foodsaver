const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { getPantry, updatePantry } = require('./controllers/pantryController');
const { authenticateUser } = require('./middleware/authMiddleware'); // Assuming you have an auth middleware

const app = express();
const port = process.env.PORT || 3000; // Use environment variable for port

app.use(cors());
app.use(bodyParser.json());
app.use(authenticateUser); // Use authentication middleware

// Endpoint to get pantry data
app.get('/pantry', getPantry);

// Endpoint to update pantry data
app.post('/pantry', updatePantry);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Pantry service listening at http://localhost:${port}`);
});