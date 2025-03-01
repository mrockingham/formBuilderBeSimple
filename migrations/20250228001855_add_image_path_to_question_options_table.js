/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table('question_options', (table) => {
      // Add image_path column. Note: the "after" clause is not supported by SQLite/Knex.
      table.string('image_path').nullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.table('question_options', (table) => {
      table.dropColumn('image_path');
    });
  };
  