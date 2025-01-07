/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable('forum', function (table) {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.text('content').notNullable();
        table.integer('user_id').notNullable()
            .references('id').inTable('users')
            .onDelete('CASCADE');
        table.string('photo_url'); // To store uploaded photo URLs
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTableIfExists('forum');
}
