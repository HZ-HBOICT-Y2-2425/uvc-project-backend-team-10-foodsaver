module.exports = {
  client: 'sqlite3',
  connection: {
    filename: './tips.db',  // Ubicación de tu base de datos SQLite
  },
  useNullAsDefault: true, // Requerido para SQLite
  migrations: {
    directory: './migrations',  // Ruta donde están las migraciones
  },
};
