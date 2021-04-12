const transportData = require('../seed_data/transportation')
exports.seed = function(knex) {
      let transportPromise = [];
      transportData.forEach((entry) => {
            let user = entry.username;
            transportPromise.push(createEntries(knex, entry, user)) 
      });
      return Promise.all(transportPromise);
};

const createEntries= (knex, entry, user) => {
      return knex('users').where('username', user).first()
      .then((item)=>{
            return knex('transportation').insert({
                  result_transport_total:entry.result_transport_total,
                  time_input: entry.time_input,
                  user_id: item.id
            })
      })
}