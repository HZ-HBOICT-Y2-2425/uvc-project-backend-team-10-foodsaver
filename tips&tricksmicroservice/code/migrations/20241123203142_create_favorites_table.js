exports.up = function(knex) {
  return knex.schema.createTable('tips', (table) => {
    table.increments('id').primary(); // ID autoincremental
    table.string('category').notNullable(); // Categoría del tip (ej. "Reutilizar", "Guardar")
    table.string('title').notNullable(); // Título del tip
    table.text('description'); // Descripción del tip
    table.timestamps(true, true); // Timestamps automáticos
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('tips'); // Eliminar la tabla
};
