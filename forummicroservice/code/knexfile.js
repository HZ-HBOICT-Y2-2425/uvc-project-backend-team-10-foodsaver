export const development = {
  client: 'sqlite3', // Change 'better-sqlite3' to 'sqlite3'
  connection: {
    filename: './forum.db', // Path to your SQLite database file
  },
  useNullAsDefault: true, // Required for SQLite
  migrations: {
    directory: './migrations', // Path to your migrations folder
    extension: 'js',  // Specify the file extension for migrations
  },
};

export default development;
