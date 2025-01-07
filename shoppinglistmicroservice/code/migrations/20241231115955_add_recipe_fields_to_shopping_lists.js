/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function up(knex) {
    // Check if the column exists before adding it
    const hasRecipeName = await knex.schema.hasColumn('shopping_lists', 'recipe_name');
    const hasRecipeImage = await knex.schema.hasColumn('shopping_lists', 'recipe_image');
  
    return knex.schema.table('shopping_lists', (table) => {
      if (!hasRecipeName) {
        table.string('recipe_name').nullable(); // Add recipe_name column if it doesn't exist
      }
      if (!hasRecipeImage) {
        table.string('recipe_image').nullable(); // Add recipe_image column if it doesn't exist
      }
    });
  }
  
  /**
   * @param {import("knex").Knex} knex
   * @returns {Promise<void>}
   */
  export async function down(knex) {
    return knex.schema.table('shopping_lists', (table) => {
      table.dropColumn('recipe_name'); // Remove recipe_name column
      table.dropColumn('recipe_image'); // Remove recipe_image column
    });
  }
  