/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function up(knex) {
    return knex.schema.createTable('users', (table) => {
      table.increments('id').primary(); // Auto-incrementing ID
      table.string('username').notNullable().unique(); // Unique username
      table.string('email').notNullable().unique(); // Unique email
      table.string('password').notNullable(); // Password (hashed)
      table.timestamps(true, true); // created_at and updated_at timestamps
    });
  }
  
  /**
   * @param {import("knex").Knex} knex
   * @returns {Promise<void>}
   */
  export async function down(knex) {
    await knex.schema.dropTableIfExists('users');
  }
  