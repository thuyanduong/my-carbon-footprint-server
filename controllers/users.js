require('dotenv').config();
const db = require('../db/db')
const jwt = require('jsonwebtoken');
const { default: knex } = require('knex');


const makeToken = (identity) => {
    const accToken = jwt.sign(identity, Buffer.from(process.env.TSK),{
        expiresIn: "1d",
    })
    return accToken 
}

const login = async(req,res)=> {
    try{
        const user = await db.one("SELECT * FROM users WHERE username = $1 AND password = $2 ", [req.body.username, req.body.password])
    }
    catch(err){

    }
}

const signUp = async(req,res)=> {
    try{
        const user = await db.none("INSERT INTO users (username,password,result_grand_total,carbon_emission_goal) VALUES $1,$2,$3,$4", [req.body.username, req.body.password, 0, req.body.emission])
        const data = await db.one("SELECT * FROM users WHERE username = $1 AND password = $2 ", [req.body.username, req.body.password])
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