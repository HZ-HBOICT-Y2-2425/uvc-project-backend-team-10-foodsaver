const development = {
  client: 'sqlite3',
  connection: {
    filename: './shoppinglists.db',
  },
  useNullAsDefault: true,
  migrations: {
    directory: './migrations',
  },
};

export default development;
