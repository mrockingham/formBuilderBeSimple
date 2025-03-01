/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('leads', (table) => {
      table.increments('id').primary();
      table.string('name');
      table.string('email', 255).notNullable().unique();
      table.text('other_contact_info').nullable();
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('leads');
  };
  