/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table('events', (table) => {
      // SQLite doesn't support "after", so the column will be appended.
      table.text('campaign_code').nullable();
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.table('events', (table) => {
      table.dropColumn('campaign_code');
    });
  };
  