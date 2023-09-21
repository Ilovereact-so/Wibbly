// Update with your config settings.

module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host : 'localhost',
      port : 3306,
      // TODO change to your db name
      database: 'knex_tutorial',

      // change to your db user
      user: 'root',
      password: null,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './seeds',
    },
  },

  production: {
    client: 'mysql',
    connection: {
      database: 'srv45036_CreateUP',
      user:     'srv45036_CreateUP_user',
      password: '7VibLjh3oYq2GIi8C'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
