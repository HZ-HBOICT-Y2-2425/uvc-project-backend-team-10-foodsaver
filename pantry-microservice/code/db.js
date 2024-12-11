// db.js (or similar file for database initialization)
import knex from 'knex';
import development from './knexfile.js';  // Import your knexfile.js

// Initialize knex with the configuration
const db = knex(development);

// Export the initialized database connection
export default db;
