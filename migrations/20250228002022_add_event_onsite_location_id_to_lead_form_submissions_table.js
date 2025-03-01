/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.table('lead_form_submissions', (table) => {
      // Add the column as an unsigned big integer, nullable.
      table.bigInteger('event_onsite_location_id').unsigned().nullable();
      // Set up the foreign key referencing event_onsite_locations(id)
      table.foreign('event_onsite_location_id')
           .references('id')
           .inTable('event_onsite_locations')
           .onDelete('set null');
    });
  };
  
  exports.down = async function(knex) {
    await knex.schema.table('lead_form_submissions', (table) => {
      // Remove the foreign key constraint and the column.
      table.dropForeign(['event_onsite_location_id']);
      table.dropColumn('event_onsite_location_id');
    });
  };
  