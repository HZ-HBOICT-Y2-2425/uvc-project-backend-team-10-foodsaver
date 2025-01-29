const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());

// Routes
app.post('/register', (req, res) => {
  res.status(201).json({ success: true, message: 'Registration successful!' });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'testuser' && password === 'Test@1234') {
    return res.status(200).json({ success: true, token: 'fake-jwt-token' });
  }

  return res.status(401).json({ success: false, message: 'Invalid username or password' });
});

if (require.main === module) {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;


