/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('lead_form_submissions', (table) => {
      // Primary key column "submission_id"
      table.increments('submission_id').primary();
      // Foreign key for lead_id referencing leads.lead_id
      table.integer('lead_id').unsigned().notNullable();
      table.foreign('lead_id').references('lead_id').inTable('leads');
      // Foreign key for form_id referencing forms.form_id
      table.integer('form_id').unsigned().notNullable();
      table.foreign('form_id').references('form_id').inTable('forms');
      // Optional QR code column
      table.string('qr_code').nullable();
      // Timestamps for created_at and updated_at
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('lead_form_submissions');
  };
  