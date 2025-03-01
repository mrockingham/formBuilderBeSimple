/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table('events', (table) => {
      table.string('background_color').nullable();
      table.string('primary_color').nullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.table('events', (table) => {
      table.dropColumn('background_color');
      table.dropColumn('primary_color');
    });
  };