/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable('favorites', function(table) {
        table.increments('id').primary();          // Auto-incrementing ID
        table.integer('recipe_id').notNullable();  // Recipe ID
        table.integer('user_id').notNullable()     // User ID
            .references('id').inTable('users')     // Foreign key reference to users table
            .onDelete('CASCADE');                  // Optionally, delete favorites if user is deleted
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

export function down(knex) {
    return knex.schema.dropTableIfExists('favorites');
};
