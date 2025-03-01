/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table('form_questions', (table) => {
      // SQLite doesn't support the "after" clause, so the column will be added at the end.
      table.integer('page_number').defaultTo(1);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.table('form_questions', (table) => {
      table.dropColumn('page_number');
    });
  };
  