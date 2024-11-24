/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    return knex.schema.createTable('favorites', (table) => {
        table.increments('id').primary();          // Auto-incrementing ID
        table.integer('recipe_id').notNullable();  // Recipe ID
        table.timestamps(true, true);               // created_at and updated_at timestamps
    });
}

export async function down(knex) {
    await knex.schema.dropTableIfExists('favorites');
}