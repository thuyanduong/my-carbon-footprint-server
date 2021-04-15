require('dotenv').config();
const db = require('../db/db')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

const makeToken = (identity) => {
    const accToken = jwt.sign(identity, Buffer.from(process.env.TSK,'base64'),{
        expiresIn: '1d',

    })
    return accToken 
}

const compare = (reqPass, user) =>{
    return bcrypt.compare(reqPass, user.password, (err,res) => {
        if(res){
            return makeToken({user_id:user.id})
        }
        else{
            return null
        }
    })
}


const login = async(req,res)=> {
    try{
        const user = await db.one("SELECT * FROM users WHERE username = $1 ", req.body.username)
        if(user){
            console.log("User found")
            const match = await bcrypt.compare(req.body.password, user.password)
            if(match){
                const auth = makeToken({user_id:user.id})
                res.status(200).json({token:auth})
            }
            else{
                res.status(403).json({success:false, message: 'Passwords do not match'})
            }
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
        const hashedPass = await bcrypt.hash(req.body.password, 10)
        await db.none("INSERT INTO users (username,password,result_grand_total,carbon_emission_goal) VALUES ($1,$2,$3,$4)", [req.body.username, hashedPass, 0, req.body.emission])
        const data = await db.one("SELECT * FROM users WHERE username = $1 AND password = $2 ", [req.body.username, hashedPass])
        console.log(data)
        res.status(200).json(data)
    }
    catch(err){
        res.status(500).send(err)
    }
}

const setTotalEmission =async(req,res)=> {
    try{
        console.log('Response recieved id', res.user_id)
        await db.none('UPDATE users SET result_grand_total =$2 WHERE id=$1', [res.user_id, req.body.result_grand_total])
        const user = await db.one('SELECT * FROM users WHERE id=$1', res.user_id)
        res.status(200).send({total:user.result_grand_total, user:user.username})
    }
    catch(err){

    }
}


const setEmissionGoal =async(req,res)=> {
    try{
        console.log('Response recieved id', res.user_id)
        await db.none('UPDATE users SET carbon_emission_goal=$2 WHERE id=$1', [res.user_id, req.body.carbon_emission_goal])
        const user = await db.one('SELECT * FROM users WHERE id=$1', res.user_id)
        res.status(200).send({goal:user.carbon_emission_goal, user:user.username})
    }
    catch(err){
        res.status(500).send(err)
    }
}



module.exports = {
    login,
    signUp,
    setTotalEmission,
    setEmissionGoal
}