/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('oauth_refresh_tokens', (table) => {
        table.increments("id").primary();
        table.string('refresh_token').notNullable()
        table.integer("user_id").unsigned().references('id').inTable('users').onDelete('CASCADE');
        table.string('device_id').notNullable()
        table.timestamps(true, true);

        table.unique(['user_id', 'refresh_token']);
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async knex => {
  await knex.schema.dropTableIfExists("oauth_refresh_tokens")
};
