
exports.up = function(knex) {
    return knex.schema.alterTable('food', (table) => {
        table.timestamp('updated_at').defaultTo(knex.fn.now())
        table.text('food_serving')
  })
};

exports.down = function(knex) {
    return knex.schema.alterTable("food", (table) => {
        table.dropColumn('updated_at')
        table.dropColumn('food_serving')
    })
};
