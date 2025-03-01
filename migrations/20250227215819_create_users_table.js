/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    return knex.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('name', 100);
      table.string('email', 150).unique();
      table.string('password', 255);
      table.timestamps(true, true);
    });
  }
  
  export async function down(knex) {
    return knex.schema.dropTableIfExists('users');
  }
