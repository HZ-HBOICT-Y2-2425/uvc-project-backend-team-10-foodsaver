export const up = async (knex) => {
    await knex.schema.createTable('pantry', (table) => {
      table.increments('id').primary(); // auto-increment primary key
      table.string('name').notNullable(); // name of the pantry item
      table.integer('quantity').notNullable(); // quantity of the item
      table.date('expiration_date'); // expiration date of the item (optional)
      table.integer('user_id').notNullable().unsigned(); // user_id referencing the user
      table.foreign('user_id').references('id').inTable('users'); // Foreign key constraint
    });
  };
  
  export const down = async (knex) => {
    await knex.schema.dropTableIfExists('pantry'); // Drop the table if it exists
  };
  