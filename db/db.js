require('dotenv').config()
const pgp = require("pg-promise")()
const e = require('express');
const knexfile = require("../knexfile");


    const cn = process.env.DATABASE_URL || 
    {
        host: 'localhost',
        //default  port
        port: 5432,
        database: 'footprint_test',
        user: process.env.USER,
        password: process.env.PASSWORD
    }  


const db = pgp(cn)

db.connect()
    .then(obj => {
        //saves connection object
        sco = obj
        return sco.one('SELECT * FROM users LIMIT 1')
    })
    .then(data =>{
        console.log(data.id, 'connection tested')
    })
    .catch( err => {
        console.log(`There is an issue with the db. Error: ${err}`)
    })
    .finally(() =>{
        if(sco){
            console.log('Db fully operational')
            sco.done()
        }
    })
module.exports = db
