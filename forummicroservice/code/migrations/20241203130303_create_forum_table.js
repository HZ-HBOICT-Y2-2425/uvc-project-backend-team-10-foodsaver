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
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

export function down(knex) {
    return knex.schema.dropTableIfExists('forum');
};
