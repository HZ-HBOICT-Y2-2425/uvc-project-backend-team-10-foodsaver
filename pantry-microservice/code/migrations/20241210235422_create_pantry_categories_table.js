export const up = async (knex) => {
  // Create pantry_categories table if it doesn't exist
  const existsPantryCategories = await knex.schema.hasTable('pantry_categories');
  if (!existsPantryCategories) {
    await knex.schema.createTable('pantry_categories', (table) => {
      table.increments('id').primary(); // auto-increment primary key
      table.string('category').notNullable().unique(); // category name
      table.decimal('cost_per_1kg', 10, 2).notNullable(); // cost per 1000g
      table.decimal('co2_emissions_per_1kg', 10, 2).notNullable(); // CO2 emissions per 1000g
    });
  }

  // Create pantry table if it doesn't exist
  const existsPantry = await knex.schema.hasTable('pantry');
  if (!existsPantry) {
    await knex.schema.createTable('pantry', (table) => {
      table.increments('id').primary(); // auto-increment primary key
      table.string('name').notNullable(); // name of the pantry item
      table.integer('quantity').notNullable().unsigned(); // quantity of the item
      table.string('measurement').notNullable(); // measurement unit of the amount
      table.date('expiration_date'); // expiration date of the item (optional)
      table.string('category'); // category_id referencing the pantry_categories table
      table.integer('user_id').notNullable().unsigned(); // user_id referencing the user
      table.foreign('user_id').references('id').inTable('users'); // Foreign key constraint
      table.foreign('category').references('category').inTable('pantry_categories'); // Foreign key constraint
    });
  }
};

export const down = async (knex) => {
  // Drop pantry table first due to foreign key constraint
  await knex.schema.dropTableIfExists('pantry');
  // Drop pantry_categories table
  await knex.schema.dropTableIfExists('pantry_categories');
};