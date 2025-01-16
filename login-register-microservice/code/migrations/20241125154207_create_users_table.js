/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
module.exports.up = async function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary(); // Auto-incrementing ID
    table.string('username').notNullable().unique(); // Unique username
    table.string('email').notNullable().unique(); // Unique email
    table.string('password').notNullable(); // Password (hashed)
    table.string('co2_saved'); // Amount of CO2 saved
    table.string('money_saved'); // Amount of money saved in EUR
    table.integer('recipe_count').defaultTo(0); // Recipe count
    table.timestamps(true, true); // created_at and updated_at timestamps
  });
};

/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
module.exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('users');
};

  