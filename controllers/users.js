require('dotenv').config();
const db = require('../db/db')

const jwt = require('jsonwebtoken');


const makeToken = (identity) => {
    const accToken = jwt.sign(identity, Buffer.from(process.env.TSK,'base64'),{
        expiresIn: 7,
    })
    return accToken 
}

const login = async(req,res)=> {
    try{
        const user = await db.one("SELECT * FROM users WHERE username = $1 AND password = $2 ", [req.body.username, req.body.password])
        if(user){
            console.log("User found")
            const auth = makeToken({User_id:user.id})
            res.cookie('token', auth,{httpOnly:true});
            res.status(200).json({token:auth})
        }
        else {
            console.log(`no user found with username: ${req.body.username}`)
            res.status(403).send("Unauthorized"); 
        }
    }
    catch(err){
        console.log("An Error occured while fetching user. ", err)
        res.status(500).send(err);
    }
}

const signUp = async(req,res)=> {
    try{
        console.log(req.body)
        await db.none("INSERT INTO users (username,password,result_grand_total,carbon_emission_goal) VALUES ($1,$2,$3,$4)", [req.body.username, req.body.password, 0, req.body.emission])
        const data = await db.one("SELECT * FROM users WHERE username = $1 AND password = $2 ", [req.body.username, req.body.password])
        console.log(data)
        res.status(200).json(data)
    }
    catch(err){
        res.status(500).send(err)
    }
}

const setTotalEmission =async(req,res)=> {
    try{

    }
    catch(err){

    }
}


const setEmissionGoal =async(req,res)=> {
    try{

    }
    catch(err){

    }
}

module.exports = {
    login,
    signUp,
    setTotalEmission,
    setEmissionGoal
}