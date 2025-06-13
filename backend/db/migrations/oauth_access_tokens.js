/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('oauth_access_tokens', (table) => {
        table.increments("id").primary();
        table.string('access_token').notNullable().unique();
        table.string("user_id").notNullable();
        table.string('device_id').notNullable()
        table.timestamps(true, true);

        table.unique(['user_id', 'access_token']);

      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async knex => {
  knex.schema.dropTableIfExists("oauth_access_tokens")
};
