require('dotenv').config();
const { Router } = require('express')
const {login, signUp, setTotalEmission, setEmissionGoal } = require('../controllers/users')
const router = Router()
const db = require('../db/db')
const jwt = require('jsonwebtoken');



// router.get()
router.post('/login', login)
router.post('/signup', signUp)
router.patch('/adjust/goal', setEmissionGoal) //will change to use token
router.patch('adjust/total') //will change to use token


module.exports = router