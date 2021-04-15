require('dotenv').config();
const { Router } = require('express');
const {transportTotal,transportTimeFrame, deleteTransport,updateTransport} = require('../controllers/transport');
const router = Router();
const decodeToken = require('../middleware/jwt');

// router.post('/logTransport', transportTotal);
// router.post('/timeFrame', transportTimeFrame);
// router.delete('/delete', deleteTransport);
// router.patch('/update', updateTransport);

router.post('/logTransport', decodeToken, transportTotal);
router.post('/timeFrame', decodeToken, transportTimeFrame);
router.delete('/delete', decodeToken, deleteTransport);
router.patch('/update', decodeToken, updateTransport);
module.exports = router;