const express = require('express');
const router = express.Router();
const { createChargeSt, getAllChargeSt, getAllChargeStInCity } = require("../controllers/chargeSt")

/**
 * get route for getting all chargestations
 */
router.get('/', getAllChargeSt)

/**
 * get route for all charge stations a city
 */
router.get('/city/:cityId', getAllChargeStInCity)


/**
 * post route for creating a new chargestation
 */
router.post('/', createChargeSt)



module.exports = router;