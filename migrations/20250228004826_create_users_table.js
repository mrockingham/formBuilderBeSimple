/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 * 
 * 
 * 
 */


exports.up = function(knex) {
    return knex.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('name', 100);
      table.string('email', 150).unique();
      table.string('password', 255);
      table.timestamps(true, true);
    });
 };

 exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
  };

