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
  if (!token) {
    console.log("No token provided");
    return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
  }

  try {
    const verified = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET || 'fZ3YzbwhqacdgNWYDY3Y33cU8yjjJyL');
    console.log("Token verified:", verified);
    req.user = verified;
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(403).json({ success: false, message: 'Invalid token.' });
  }
};

const updateUsername = async (req, res) => {
  const { id: userId } = req.user;
  const { newUsername } = req.body;

  console.log("Received userId from token:", userId);
  console.log("Received newUsername:", newUsername);

  if (!newUsername) {
    console.error("New username is missing");
    return res.status(400).json({ success: false, message: 'New username is required.' });
  }

  try {
    const existingUser = await knex('users').where({ username: newUsername }).first();
    console.log("Existing user with newUsername:", existingUser);

    if (existingUser) {
      console.error("Username already taken:", newUsername);
      return res.status(409).json({ success: false, message: 'Username already taken.' });
    }

    const updatedRows = await knex('users').where({ id: userId }).update({ username: newUsername });
    console.log("Number of rows updated:", updatedRows);

    if (updatedRows === 0) {
      console.error("Failed to update username, no rows affected");
      return res.status(400).json({ success: false, message: 'Failed to update username.' });
    }

    const updatedUser = await knex('users').where({ id: userId }).first();
    console.log("Updated user information:", updatedUser);

    res.status(200).json({ 
      success: true, 
      message: 'Username updated successfully.', 
      user: updatedUser
    });
  } catch (error) {
    console.error("Error updating username:", error);
    res.status(500).json({ success: false, message: 'Error updating username', error });
  }
};

const changePassword = async (req, res) => {
  const { id: userId } = req.user;
  const { oldPassword, newPassword } = req.body;

  console.log("Change password request received for userId:", userId);

  if (!oldPassword || !newPassword) {
    return res.status(400).json({ success: false, message: 'Old password and new password are required.' });
  }

  try {
    const user = await knex('users').where({ id: userId }).first();
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Incorrect old password.' });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await knex('users').where({ id: userId }).update({ password: hashedNewPassword });

    res.status(200).json({ success: true, message: 'Password updated successfully.' });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ success: false, message: 'Error changing password', error });
  }
};

const incrementRecipeCount = async (req, res) => {
  const { id: userId } = req.user;

  try {
    await knex('users').where({ id: userId }).increment('recipeCount', 1);
    const updatedUser = await knex('users').where({ id: userId }).first();

    res.status(200).json({
      success: true,
      message: 'Recipe count incremented successfully.',
      recipe_count: updatedUser.recipe_count,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error incrementing recipe count.', error });
  }
};

// Fetch top 50 users by saved money
const getTop50UsersMoneySaved = async (req, res) => {
  try {
      const users = await knex('users')
          .select('username', 'money_saved')
          .orderBy('money_saved', 'desc')
          .limit(50);

      res.status(200).json({
          success: true,
          data: users,
      });
  } catch (error) {
      console.error('Error fetching leaderboard data:', error);
      res.status(500).json({
          success: false,
          message: 'Failed to fetch leaderboard data.',
          error: error.message,
      });
  }
};

// Fetch top 50 users by saved co2
const getTop50UsersCO2Reduced = async (req, res) => {
  try {
      const users = await knex('users')
          .select('username', 'co2_saved') 
          .orderBy('co2_saved', 'desc')
          .limit(50);

      res.status(200).json({
          success: true,
          data: users,
      });
  } catch (error) {
      console.error('Error fetching leaderboard data:', error);
      res.status(500).json({
          success: false,
          message: 'Failed to fetch leaderboard data.',
          error: error.message,
      });
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

const getUserSavings = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await knex('users')
      .where({ id })
      .select('money_saved', 'co2_saved', 'recipeCount')
      .first();

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error('Error fetching user savings:', error);
    res.status(500).json({ success: false, message: 'Error fetching user savings', error });
  }
};

module.exports = { registerUser, loginUser, authenticateToken, updateUsername, changePassword, incrementRecipeCount, updateUserSavings, getUserSavings, getTop50UsersCO2Reduced, getTop50UsersMoneySaved };