
exports.up = function(knex) {
    return knew.schema.createTable('users', function(table){
        table.increments('id');
        table.string('username');
        table.string('password');
        table.bigInteger('result_grand_total');
        table.integer('carbon_emission_goal');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('users')
};
