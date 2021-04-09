const userData = require('../seed_data/user')

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('food').del()
    .then(() => {
      return knex('users').del()
      .then(() => {
      // Inserts seed entries
      return knex('users').insert(userData);
    });
  });
};
