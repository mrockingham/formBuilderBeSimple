/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table('qrscans', (table) => {
      // Add event_id as an unsigned big integer. Note: no foreign key constraint is added here.
      table.bigInteger('event_id').unsigned();
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.table('qrscans', (table) => {
      // If a foreign key exists on event_id, drop it first.
      table.dropForeign(['event_id']);
      table.dropColumn('event_id');
    });
  };
  