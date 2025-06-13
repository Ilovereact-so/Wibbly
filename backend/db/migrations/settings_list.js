
  exports.up = async function (knex) {
    await knex.schema.createTable('settings_list', (table) => {
      table.increments("id").primary();
      table.string("name").notNullable().unique();;
      table.boolean("default").notNullable();
    });
    // Dodanie triggera do tabeli `users`
  };
  
  
  exports.down = async knex => {
    await knex.schema.dropTableIfExists("settings_list")
};