/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table('questions', (table) => {
      // Note: Knex doesn't support positioning (i.e. after(...)) in SQLite,
      // so the new columns will be added to the end of the table.
      table.integer('min_length').nullable();
      table.integer('max_length').nullable();
      table.string('validation_type').nullable();
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.table('questions', (table) => {
      table.dropColumn('min_length');
      table.dropColumn('max_length');
      table.dropColumn('validation_type');
    });
  };
  