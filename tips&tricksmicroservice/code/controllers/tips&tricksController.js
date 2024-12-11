// controller.js
import development from '../knexfile.js';
import knex from 'knex';

const db = require('./db');  // Asegúrate de tener la conexión con Knex aquí

// Función para obtener los tips de una categoría
async function getTipsByCategory(req, res) {
  const { category } = req.params;

  try {
    // Buscar los tips por la categoría seleccionada
    const tips = await db('tips')
      .where('category', category)
      .select('id', 'title', 'description', 'category');
    
    // Verifica si existen tips para esa categoría
    if (tips.length === 0) {
      return res.status(404).json({ message: 'No tips found for this category' });
    }

    // Responder con los tips
    res.json(tips);
  } catch (error) {
    console.error('Error fetching tips:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = {
  getTipsByCategory
};
