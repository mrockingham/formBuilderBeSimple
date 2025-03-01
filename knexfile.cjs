// knexfile.cjs
module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './database.db'
    },
    useNullAsDefault: true, // required for sqlite3
    migrations: {
      directory: './migrations'
    },
    seeds: {
      directory: './seeders'
    }
  }
};
  