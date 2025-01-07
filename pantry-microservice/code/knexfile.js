export const development = {
  client: 'sqlite3',
  connection: {
    filename: './pantry.db',  // Path to the SQLite database file
  },
  useNullAsDefault: true,  // Required for SQLite databases
  migrations: {
    directory: './migrations',  // Path to migration files
    extension: 'js',  // Extension for migration files
  },
};

export default development;
