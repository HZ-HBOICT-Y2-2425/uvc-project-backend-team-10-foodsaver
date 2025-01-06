/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
module.exports.up = async function up(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('username').notNullable().unique();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table.integer('recipe_count').defaultTo(0);
    table.timestamps(true, true);
  });
};

/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
module.exports.down = async function down(knex) {
  return knex.schema.dropTableIfExists('users');
};
