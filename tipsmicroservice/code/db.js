const knex = require('knex');
const knexConfig = require('./knexfile');  // Importa la configuración desde knexfile.js

const db = knex(knexConfig);  // Crea una instancia de Knex usando la configuración

module.exports = db;  // Exporta la instancia de Knex para usarla en otros archivos
