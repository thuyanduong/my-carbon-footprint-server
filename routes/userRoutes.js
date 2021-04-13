require('dotenv').config();
const { Router } = require('express')
const {login, signUp, setTotalEmission, setEmissionGoal } = require('../controllers/users')
const router = Router()
const decodeToken = require('../middleware/jwt')



router.post('/login', login)
router.post('/signup', signUp)
router.patch('/adjust/goal', decodeToken, setEmissionGoal) //will change to use token
router.patch('/adjust/total',decodeToken, setTotalEmission) //will change to use token
router.post('/food/add', decodeToken,)


module.exports = router