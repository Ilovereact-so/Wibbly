
  exports.up = async function (knex) {
    await knex.schema.createTable('users_settings', (table) => {
      table.increments("id").primary();
      table.integer("user_id").unsigned().references('id').inTable('users').onDelete('CASCADE');
      table.integer("settings_id").unsigned().references('id').inTable('settings_list').onDelete('CASCADE');
      table.boolean("settings_value").notNullable();
      table.timestamps(true, true);


      table.unique(['user_id', 'settings_id']);
    });
    // Dodanie triggera do tabeli `users`
  /*await knex.raw(`
    CREATE OR REPLACE FUNCTION add_default_settings()
    RETURNS TRIGGER AS $$
    DECLARE
        setting_record RECORD;  -- Zmienna do przechowywania rekordów z settings_list
    BEGIN
        -- Pobierz pierwsze 4 rekordy z settings_list
        FOR setting_record IN
            SELECT setting_value FROM settings_list
            ORDER BY id
            LIMIT 4
        LOOP
            -- Wstaw każdy rekord do users_settings
            INSERT INTO users_settings (user_id, setCard_options)
            VALUES (NEW.id, setting_record.setting_value);
        END LOOP;

        RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;

    CREATE TRIGGER after_user_insert
    AFTER INSERT ON users
    FOR EACH ROW
    EXECUTE FUNCTION add_default_settings();
  `);*/
  };
  
  
  exports.down = async knex => {
    await knex.schema.dropTableIfExists("users_settings")
};