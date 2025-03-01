/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('form_questions', (table) => {
      // Primary key column "form_question_id"
      table.increments('form_question_id').primary();
      // Foreign key for form_id referencing forms.form_id
      table.integer('form_id').unsigned().notNullable();
      table.foreign('form_id').references('form_id').inTable('forms');
      // Foreign key for question_id referencing questions.question_id
      table.integer('question_id').unsigned().notNullable();
      table.foreign('question_id').references('question_id').inTable('questions');
      // Sequence number
      table.integer('sequence_number');
      // Timestamps for created_at and updated_at
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('form_questions');
  };
  