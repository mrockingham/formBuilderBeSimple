/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('event_onsite_locations', (table) => {
      table.increments('id').primary();
      table.bigInteger('event_id').unsigned().notNullable();
      table.string('name');
      table.timestamps(true, true);
      
      // Add foreign key constraint: references event_id on events table, cascading on delete.
      table.foreign('event_id')
           .references('event_id')
           .inTable('events')
           .onDelete('cascade');
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('event_onsite_locations');
  };

  