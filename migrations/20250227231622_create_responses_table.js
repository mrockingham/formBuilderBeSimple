/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('responses', (table) => {
      // Primary key column "response_id"
      table.increments('response_id').primary();
      // Foreign key for submission_id referencing lead_form_submissions.submission_id
      table.integer('submission_id').unsigned().notNullable();
      table.foreign('submission_id').references('submission_id').inTable('lead_form_submissions');
      // Foreign key for question_id referencing questions.question_id
      table.integer('question_id').unsigned().notNullable();
      table.foreign('question_id').references('question_id').inTable('questions');
      // Foreign key for option_id referencing question_options.option_id (nullable)
      table.integer('option_id').unsigned().nullable();
      table.foreign('option_id').references('option_id').inTable('question_options');
      // Value field (text, nullable)
      table.text('value').nullable();
      // Timestamps for created_at and updated_at
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('responses');
  };
  