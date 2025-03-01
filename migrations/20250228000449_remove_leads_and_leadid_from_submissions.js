/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    // Check if the "lead_id" column exists in "lead_form_submissions"
    const hasLeadId = await knex.schema.hasColumn('lead_form_submissions', 'lead_id');
    if (hasLeadId) {
      // Drop the foreign key constraint and the column
      await knex.schema.table('lead_form_submissions', (table) => {
        table.dropForeign('lead_id');
        table.dropColumn('lead_id');
      });
    }
  
    // Drop the "leads" table if it exists
    await knex.schema.dropTableIfExists('leads');
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = async function(knex) {
    // Recreate the "leads" table
    await knex.schema.createTable('leads', (table) => {
      table.bigIncrements('lead_id');
      table.timestamps(true, true);
    });
  
    // Add the "lead_id" column back to "lead_form_submissions"
    await knex.schema.table('lead_form_submissions', (table) => {
      table.bigInteger('lead_id').unsigned().nullable();
    });
  
    // Add the foreign key constraint back on "lead_id"
    await knex.schema.table('lead_form_submissions', (table) => {
      table.foreign('lead_id').references('lead_id').inTable('leads').onDelete('cascade');
    });
  };
  