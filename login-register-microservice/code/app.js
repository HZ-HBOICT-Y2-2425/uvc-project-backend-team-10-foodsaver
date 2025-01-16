const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());

// Routes
app.post('/register', (req, res) => {
  res.status(201).json({ success: true, message: 'Registration successful!' });
});

if (require.main === module) {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;


