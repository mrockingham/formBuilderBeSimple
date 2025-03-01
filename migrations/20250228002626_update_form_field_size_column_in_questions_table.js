/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.alterTable('questions', (table) => {
      // Change form_field_size to a float with precision 8,2.
      table.float('form_field_size', 8, 2).alter();
    });
  };
  
  exports.down = async function(knex) {
    await knex.schema.alterTable('questions', (table) => {
      // Revert form_field_size back to an integer.
      table.integer('form_field_size').alter();
    });
  };
  