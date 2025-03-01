/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table('forms', (table) => {
      // Note: The "after" clause is not supported in SQLite via Knex,
      // so the column will be appended to the table.
      table.json('page_titles').nullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.table('forms', (table) => {
      table.dropColumn('page_titles');
    });
  };
  