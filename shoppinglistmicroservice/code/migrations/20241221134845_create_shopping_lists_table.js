/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function up(knex) {
  return knex.schema.createTable('shopping_lists', (table) => {
    table.increments('id').primary(); // Auto-incrementing ID
    table.string('name').notNullable(); // Name of the shopping list
    table.integer('user_id').unsigned().notNullable() // Foreign key to users table
      .references('id')
      .inTable('users')
      .onDelete('CASCADE'); // Deletes shopping lists if the user is deleted
    table.string('recipe_name').nullable(); // Name of the associated recipe
    table.string('recipe_image').nullable(); // URL of the recipe image
    table.timestamps(true, true); // created_at and updated_at timestamps
  });
}

/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function down(knex) {
  return knex.schema.dropTableIfExists('shopping_lists');
}
