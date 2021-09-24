
exports.up = function(knex) {
  return knex.schema.createTable('events',function(table){
      table.increments();
      table.string('description').notNullable();
      table.datetime('init_date').notNullable();
      table.datetime('end_date').notNullable();
      table.string('users_id').notNullable();
      table.foreign('users_id').references('id').inTable('users');
  })
};

exports.down = function(knex) {
  return knes.schema.dropTable('events');
};
