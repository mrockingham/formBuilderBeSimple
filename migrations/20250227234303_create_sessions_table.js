/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('sessions', (table) => {
      // Primary key as a string
      table.string('id').primary();
      // Nullable foreign key for user_id with an index
      table.integer('user_id').unsigned().nullable().index();
      // IP address column, with a length of 45 characters
      table.string('ip_address', 45).nullable();
      // User agent column
      table.text('user_agent').nullable();
      // Payload column stored as long text
      table.text('payload', 'longtext');
      // last_activity column with an index
      table.integer('last_activity').index();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('sessions');
  };
  