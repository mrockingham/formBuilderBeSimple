/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.table('events', (table) => {
      // Add event_type_id as an unsigned big integer, nullable.
      table.bigInteger('event_type_id').unsigned().nullable();
      // Add the foreign key constraint: references event_types.id, cascade on update, set null on delete.
      table.foreign('event_type_id').references('id').inTable('event_types').onUpdate('cascade').onDelete('set null');
      // Add the active column as a boolean with a default of false.
      table.boolean('active').defaultTo(false);
    });
  };
  
  exports.down = async function(knex) {
    await knex.schema.table('events', (table) => {
      // Drop the foreign key first.
      table.dropForeign(['event_type_id']);
      // Drop the columns.
      table.dropColumn('event_type_id');
      table.dropColumn('active');
    });
  };
  