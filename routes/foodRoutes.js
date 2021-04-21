require('dotenv').config();
const { Router } = require('express');
const {logFoodTotal,foodTimeFrame,deleteFood,updateFood, getUserEntries} = require('../controllers/food');
const router = Router();
const decodeToken = require('../middleware/jwt');


// router.post('/logFood', logFoodTotal);
// router.post('/timeFrame', foodTimeFrame);
// router.delete('/delete', deleteFood);
// router.patch('/update', updateFood);

router.get('/entries', decodeToken, getUserEntries)
router.post('/logFood', decodeToken, logFoodTotal);
router.post('/timeFrame', decodeToken, foodTimeFrame);
router.delete('/delete', decodeToken, deleteFood);
router.patch('/update', decodeToken, updateFood);




module.exports = router