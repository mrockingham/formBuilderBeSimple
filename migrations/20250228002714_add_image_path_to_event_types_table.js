/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table('event_types', (table) => {
      // Note: The "after('name')" clause is not supported by SQLite via Knex,
      // so the column will simply be appended.
      table.string('image_path').nullable();
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.table('event_types', (table) => {
      table.dropColumn('image_path');
    });
  };
  