/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table('questions', (table) => {
      table.string('question_number').nullable();
      table.string('question_name').nullable();
      table.boolean('is_ffs').defaultTo(false);
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.table('questions', (table) => {
      table.dropColumn('question_number');
      table.dropColumn('question_name');
      // Note: 'is_ffs' is not dropped because the original PHP migration did not drop it.
    });
  };
  