exports.up = function (knex) {
    return knex.schema.createTable('transportation', (table) => {
      table.increments('id');
      table.decimal('result_transport_total');
      table.timestamp('time_input').defaultTo(knex.fn.now());
      table.integer('user_id').unsigned().references('users.id');
    });
  };
  exports.down = function (knex) {
    return knex.schema.dropTable('transportation');
  };