const foodData = require('../seed_data/food')
exports.seed = function(knex) {
      // Inserts seed entries
      let foodPromise =[];
      foodData.forEach((ent)=>{
            let user = ent.username;
            foodPromise.push(createEntries(knex, ent,user)) 
      });
      return Promise.all(foodPromise);
};

const createEntries= (knex,ent,user) => {
      return knex('users').where('username', user).first()
      .then((item)=>{
            return knex('food').insert({
                  result_food_total:ent.result_food_total,
                  time_input: ent.time_input,
                  user_id: item.id
            })
      })
}