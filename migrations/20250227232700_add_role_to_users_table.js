/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('check_ins', (table) => {
      // Primary key column "checkin_id"
      table.increments('checkin_id').primary();
      // Email column
      table.string('email');
      // Foreign key for event_id referencing events.event_id
      table.integer('event_id').unsigned().notNullable();
      table.foreign('event_id').references('event_id').inTable('events');
      // Timestamps for created_at and updated_at
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('check_ins');
  };
  