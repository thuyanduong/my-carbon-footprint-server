
exports.up = function(knex) {
    return knex.schema.createTable('users', function(table){
        table.increments('id');
        table.string('username');
        table.string('password');
        table.decimal('result_grand_total');
        table.integer('carbon_emission_goal');
        table.decimal('estimated_emission');
        table.integer('location');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('users')
};
