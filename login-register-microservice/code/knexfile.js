module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './login_register.db',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './code/migrations',
    },
  },
};

