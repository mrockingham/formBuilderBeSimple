/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Check if table exists before trying to delete
  const exists = await knex.schema.hasTable('users');
  if (exists) {
    await knex('users').del();
  }
  
  // Insert seed entries
  await knex('users').insert([
    {
      name: 'Admin',
      email: 'admin@example.com',
      password: 'password', // Remember to hash passwords in production!
    },
    {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password',
    }
  ]);
};
