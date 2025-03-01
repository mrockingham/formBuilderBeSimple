/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table('questions', (table) => {
      // Add the style column as text and nullable.
      table.text('style').nullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.table('questions', (table) => {
      table.dropColumn('style');
    });
  };
  