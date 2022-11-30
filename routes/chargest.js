const express = require('express');
const router = express.Router();
const { createChargeSt, getAllChargeSt, getAllChargeStInCity, getOneChargeSt, updateOneChargeSt, } = require("../controllers/chargeSt")

/**
 * get route for getting all chargestations
 */
router.get('/', getAllChargeSt)

/**
 * get route for all charge stations a city
 */
router.get('/city/:cityId', getAllChargeStInCity)

/**
 * Get route for getting one single chargest with req.params
 */
router.get('/:id', getOneChargeSt)

/**
 * put route for update one chargestation
 */
router.put('/:id', updateOneChargeSt)


/**
 * post route for creating a new chargestation
 */
router.post('/', createChargeSt)



module.exports = router;