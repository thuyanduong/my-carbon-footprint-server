require('dotenv').config();
const { Router } = require('express');
const { logEstimatedEmission } = require('../controllers/estimation');
const router = Router();
const decodeToken = require('../middleware/jwt');

router.post('/estimated', decodeToken, logEstimatedEmission);

module.exports = router;