const knex = require('knex')({
    client: 'sqlite3',
    connection: {
      filename: './login_register.db',
    },
    useNullAsDefault: true,
  });
  
  async function checkTable() {
    const tableInfo = await knex('users').columnInfo();
    console.log(tableInfo);
    process.exit(0);
  }
  
  checkTable().catch((err) => {
    console.error(err);
    process.exit(1);
  });
  