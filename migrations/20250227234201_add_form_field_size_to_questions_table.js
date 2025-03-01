/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table('questions', (table) => {
      // Add an unsigned tiny integer for form_field_size with a default of 1.
      // Note: SQLite doesn't have a native tinyint type, so we use integer.
      table.integer('form_field_size').unsigned().defaultTo(1);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.table('questions', (table) => {
      table.dropColumn('form_field_size');
    });
  };