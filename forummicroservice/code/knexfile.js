export const development = {
  client: 'sqlite3',
  connection: {
    filename: './forum.db',
  },
  useNullAsDefault: true, // Required for SQLite
  migrations: {
    directory: './migrations',
    extension: 'js',  // Specify the file extension here
  },
};

export default development;
