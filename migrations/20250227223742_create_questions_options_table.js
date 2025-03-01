/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('question_options', (table) => {
      // Primary key column "option_id"
      table.increments('option_id').primary();
      // Foreign key "question_id" referencing "questions.question_id"
      table.integer('question_id').unsigned().notNullable();
      table.foreign('question_id').references('question_id').inTable('questions');
      // Other columns
      table.string('label');
      table.string('value');
      table.integer('sequence_number');
      // Timestamps for created_at and updated_at
      table.timestamps(true, true);
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('question_options');
  };
  