/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table('questions', (table) => {
      // SQLite doesn't support the "after" clause, so this column is added at the end.
      table.string('image_path').nullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.table('questions', (table) => {
      table.dropColumn('image_path');
    });
  };
  
