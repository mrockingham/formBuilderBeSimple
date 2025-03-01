/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('questions', (table) => {
      table.increments('question_id').primary();
      table.text('question_text');
      // Define the column before adding the foreign key constraint.
      table.integer('question_type_id').unsigned().notNullable();
      table.foreign('question_type_id').references('question_type_id').inTable('questions_types');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('questions');
  };
  