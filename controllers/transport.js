require('dotenv').config();
const db = require('../db/db')
// Insert new transport record
const transportTotal = async(req,res)=> {
    let total = req.body.result_transport_total;
    // let user_id = req.body.user_id;
    let user_id = res.user_id;
    if(!(Number.isInteger(total) && Number.isInteger(user_id))){
        return res.status(400).json({
            message: "Bad input",
        });
    }
    try{
        await db.none("INSERT INTO transportation(result_transport_total, user_id) VALUES($1,$2)",[total,user_id]);
        return res.status(200).json({
            message: "success",
        });
    }
    catch(err){
        res.status(500).send(err)
    }
}

// Retrieve transport items of a user by start and end time. 
const transportTimeFrame = async(req,res)=> {
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
        const data = await db.any("SELECT * FROM transportation Where time_input BETWEEN $1 AND $2 and user_id = $3",[start,end,user_id]);
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
// Delete Tranport item by id and user_id
const deleteTransport = async(req,res)=> {
    let id = req.body.id;
    // let user_id = req.body.user_id;
    let user_id = res.user_id;
    if(!(Number.isInteger(id) && Number.isInteger(user_id))){
        return res.status(400).json({
            message: "Bad input",
        });
    }
    try{
        await db.none("DELETE FROM transportation WHERE id = $1 AND user_id = $2",[id,user_id]);
        return res.status(200).json({
           message:"Entry Deleted"
        });
    }
    catch(err){
        res.status(500).send(err)
    }
}

// Updates the result_transport total and time_input.
//id of item, user_id, and new result_transport total must be given
const updateTransport =  async(req,res)=> {
    let id = req.body.id;
    // let user_id = req.body.user_id;
    let user_id = res.user_id;
    let total = req.body.result_transport_total
    if(!(Number.isInteger(id) && Number.isInteger(user_id) && Number.isInteger(total))){
        return res.status(400).json({
            message: "Bad input",
        });
    }
    try{
        await db.none("UPDATE transportation SET " + 
                     "result_transport_total = $1, " + 
                      "time_input = CURRENT_TIMESTAMP " +
                      "where id = $2 AND user_id = $3",[total,id,user_id]);
        return res.status(200).json({
           message:"Entry updated"
        });
    }
    catch(err){
        res.status(500).send(err)
    }
}

module.exports = {
    transportTotal,
    transportTimeFrame,
    deleteTransport,
    updateTransport
}