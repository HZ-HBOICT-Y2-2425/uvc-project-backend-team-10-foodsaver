const knex = require('knex')(require('../knexfile').development);
const bcrypt = require('bcrypt');

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

const jwt = require('jsonwebtoken');

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'All fields are required!' });
  }

  try {
    const user = await knex('users').where({ username }).first();
    if (user && (await bcrypt.compare(password, user.password))) {
      // Generate JWT
      const token = jwt.sign(
        { id: user.id, username: user.username, email: user.email },
        process.env.JWT_SECRET || 'fZ3YzbwhqacdgNWYDY3Y33cU8yjjJyL',
        { expiresIn: '1h' }
      );

      res.status(200).json({
        success: true,
        message: 'Login successful!',
        token,
      });
    } else {
      res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error logging in', error });
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

// Obtener información del usuario autenticado
// const getAuthenticatedUser = async (req, res) => {
//   try {
//       // Obtener el ID del usuario autenticado desde `req.user`
//       const user = await knex('users')
//           .select('id', 'username', 'email') // Seleccionar solo los campos necesarios
//           .where({ id: req.user.id })
//           .first();

//       if (!user) {
//           return res.status(404).json({ error: "User not found" });
//       }

//       // Enviar los datos del usuario como respuesta
//       res.status(200).json(user);
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// get all the favorite recipes's IDs
export async function getAuthenticatedUser(req, res) {
  try {
      const username = await db('users').select('username');
      res.status(200).json(username);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to retrieve favorite recipe IDs" });
  }
}


module.exports = { registerUser, loginUser, authenticateToken, getAuthenticatedUser };
