const fs = require('fs');
const db = require('./db');  // Asegúrate de que la ruta sea correcta

async function seedTips() {
  try {
    // Lee el archivo tips.json
    const data = fs.readFileSync('./tips.json', 'utf-8');
    const tips = JSON.parse(data);

    // Inserta los tips en la base de datos
    await db('tips').insert(tips);  // Asegúrate de que 'db' sea una instancia de Knex
    console.log('Tips added to the database successfully!');
  } catch (error) {
    console.error('Error seeding tips:', error.message);
  } finally {
    process.exit();
  }
}

seedTips();
