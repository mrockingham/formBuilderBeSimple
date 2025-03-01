/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('forms', (table) => {
      table.increments('form_id').primary();
      table.foreign('event_id').references('event_id').inTable('events');
      table.string('name');
      table.timestamps(true, true);
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.down = function(knex) {
    return knex.schema.dropTable('forms');
  
};
