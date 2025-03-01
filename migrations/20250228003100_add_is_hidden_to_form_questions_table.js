/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table('form_questions', (table) => {
      // SQLite does not support "after" clause so the column is appended.
      table.boolean('is_hidden').defaultTo(false).nullable();
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.table('form_questions', (table) => {
      table.dropColumn('is_hidden');
    });
  };
  
