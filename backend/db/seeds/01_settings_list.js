const bcrypt = require('bcrypt');
const seed_userDAO = require('../../dao/user');
const jwt = require('jwt-simple');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  const options = [
    {
      "name": "AutoSave",
      "default": true
    },
    {
        "name": "DevBtn",
        "default": false
    },
    {
        "name": "DarkMode",
        "default": false
    },
    {
        "name": "DefaultTutorial",
        "default": true
    }
  ];


  for(var i = 0; i < options.length; i++ ){
    await knex('settings_list')
    .insert({"name":options[i].name,"default":options[i].default})
  }
 
}
