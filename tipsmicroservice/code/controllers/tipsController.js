const db = require('../db.js'); // Asegúrate de que la ruta es correcta
const express = require('express');
const cors = require('cors');

// Controlador actualizado
async function getTipsByCategory(req, res) {
  const { category } = req.query; // Cambiado de req.params a req.query

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

async function getTipsByUse(req, res) {
  const category  = "Make the Most of Every Part of Your Ingredients"; // Cambiado de req.params a req.query
  console.log(category);
  try {
    // Buscar los tips por la categoría seleccionada
    const tips = await db('tips')
      .where('category', category)
      .select('id', 'title', 'description', 'category');
      console.log(tips);

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
  getTipsByCategory,
  getTipsByUse
};
