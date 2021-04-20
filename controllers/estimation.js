require('dotenv').config();
const db = require('../db/db')

// Insert estimated carbon emission to record
const logEstimatedEmission = async(req,res)=> {
    let emissionTotal = req.body.estimated_emission;
    let location = req.body.location;
    let user_id = res.user_id;

    // if(!(typeof emissionTotal === "number" && Number.isInteger(user_id))){
    //     return res.status(400).json({
    //         message: "Bad input",
    //     });
    // }
    
    try{
        await db.none("UPDATE USERS SET location = $1, estimated_emission = $2 WHERE id = $3",[location, emissionTotal,user_id]);
        return res.status(200).json({
            message: "success",
        });
    }
    catch(err){
        res.status(500).send(err)
    }
}

module.exports = {
    logEstimatedEmission
}