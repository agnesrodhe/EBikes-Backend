const express = require('express');
const router = express.Router();
const { createChargeSt, getAllChargeSt } = require("../controllers/chargeSt")

/**
 * get route for getting all chargestations
 */
router.get('/', getAllChargeSt)


/**
 * post route for creating a new chargestation
 */
router.post('/', createChargeSt)



module.exports = router;