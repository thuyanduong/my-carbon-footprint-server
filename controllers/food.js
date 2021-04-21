require('dotenv').config();
const db = require('../db/db')

// Insert new Food record
const logFoodTotal = async(req,res)=> {
    let foodTotal = req.body.result_food_total;
    let food_serving = JSON.stringify(req.body.food_serving)
    let user_id = res.user_id;
    if(!(typeof foodTotal === 'number' && Number.isInteger(user_id))){
        return res.status(400).json({
            message: "Bad input",
        });
    }
    try{
        await db.none("INSERT INTO FOOD(result_food_total, user_id, food_serving) VALUES($1,$2,$3)",[foodTotal,user_id, food_serving]);
        return res.status(200).json({
            message: "success",
        });
    }
    catch(err){
        res.status(500).send(err)
    }
}

// Retrieve food items of a user by start and end time. 
const foodTimeFrame = async(req,res)=> {
    let start = req.body.start;
    let end = req.body.end;
    // let user_id = req.body.user_id;
    let user_id = res.user_id;
    if(!(Number.isInteger(user_id))){
        return res.status(400).json({
            message: "Bad input",
        });
    }
    try{
        const data = await db.any("SELECT * FROM FOOD Where time_input BETWEEN $1 AND $2 and user_id = $3",[start,end,user_id]);
        if(data.length == 0){
            return res.json({
                message:"No record"
            })
        }
        return res.status(200).json({
           message:data
        });
    }
    catch(err){
        res.status(500).send(err)
    }
}

// Delete a food record
const deleteFood = async(req,res)=> {
    let id = req.body.id;
    // let user_id = req.body.user_id;
    let user_id = res.user_id;
    if(!(Number.isInteger(id) && Number.isInteger(user_id))){
        return res.status(400).json({
            message: "Bad input",
        });
    }
    try{
        await db.none("DELETE FROM FOOD WHERE id = $1 AND user_id = $2",[id,user_id]);
        return res.status(200).json({
           message:"Entry Deleted"
        });
    }
    catch(err){
        res.status(500).send(err)
    }
}

//updates result_food_total and time_input of a food record;
const updateFood =  async(req,res)=> {
    let id = req.body.id;
    // let user_id = req.body.user_id;
    let user_id = res.user_id;
    let foodTotal = req.body.result_food_total
    if(!(Number.isInteger(id) && Number.isInteger(user_id) && Number.isInteger(foodTotal))){
        return res.status(400).json({
            message: "Bad input",
        });
    }
    try{
        await db.none("UPDATE food SET " + 
                     "result_food_total = $1, " + 
                      "time_input = CURRENT_TIMESTAMP " +
                      "where id = $2 AND user_id = $3",[foodTotal,id,user_id]);
        return res.status(200).json({
           message:"Entry updated"
        });
    }
    catch(err){
        res.status(500).send(err)
    }
}

const getUserEntries = async(req,res) =>{
    const user_id = res.user_id
    const date = new Date().toISOString().split('T')
    const entries = await db.any('SELECT food_serving,id FROM food WHERE time_input > $2 AND user_id = $1', [user_id, date[0]])
    const formattedEntries = entries.map(food => {
        food.food_serving = JSON.parse(food.food_serving)
        return food
    })
    res.status(200).json({response:formattedEntries});

}

module.exports = {
    logFoodTotal,
    foodTimeFrame,
    deleteFood,
    updateFood,
    getUserEntries
}