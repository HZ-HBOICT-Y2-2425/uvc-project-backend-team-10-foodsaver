const knex = require('knex')(require('../knexfile').development);
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ success: false, message: 'All fields are required!' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await knex('users').insert({ username, email, password: hashedPassword });
    res.status(201).json({ success: true, message: 'Registration successful!' });
  } catch (error) {
    if (error.message.includes('UNIQUE constraint')) {
      res.status(400).json({ success: false, message: 'Email or username already registered.' });
    } else {
      res.status(500).json({ success: false, message: 'Error registering user', error });
    }
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  console.log("Login Request Received: ", { username, password });

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'All fields are required!' });
  }

  try {
    const user = await knex('users').where({ username }).first();
    console.log("User Found: ", user);

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { id: user.id, username: user.username, email: user.email },
        process.env.JWT_SECRET || 'fZ3YzbwhqacdgNWYDY3Y33cU8yjjJyL',
        { expiresIn: '1h' }
      );

      console.log("JWT Generated: ", token);

      return res.status(200).json({
        success: true,
        message: 'Login successful!',
        token,
        username: user.username,
        id: user.id,
      });
    } else {
      console.log("Invalid credentials");
      return res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error("Error logging in: ", error);
    return res.status(500).json({ success: false, message: 'Error logging in', error });
  }
};

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });

  try {
    const verified = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET || 'your_jwt_secret');
    req.user = verified;
    next();
  } catch (error) {
    res.status(403).json({ success: false, message: 'Invalid token.' });
  }
};

const updateUserSavings = async (req, res) => {
  const { id } = req.params;
  const { money_saved, co2_saved } = req.body;

  if (money_saved === undefined || co2_saved === undefined) {
    return res.status(400).json({ success: false, message: 'Both money_saved and co2_saved fields are required!' });
  }

  try {
    await knex('users')
      .where({ id })
      .update({ money_saved, co2_saved });

    res.status(200).json({ success: true, message: 'Savings updated successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating savings', error });
  }
};

module.exports = { registerUser, loginUser, authenticateToken, updateUserSavings };
