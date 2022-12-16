const express = require('express');
const router = express.Router();
const { cookieJwtAuth } = require('../middleware/jwtAuth');
const
    {
        createChargeSt, getAllChargeSt,
        getAllChargeStInCity, getOneChargeSt,
        updateOneChargeSt,
    } = require("../controllers/chargeSt");

/**
 * get route for getting all chargestations
 */
router.get('/', cookieJwtAuth, getAllChargeSt);

/**
 * get route for all charge stations a city
 */
router.get('/city/:cityId', cookieJwtAuth, getAllChargeStInCity);

/**
 * Get route for getting one single chargest with req.params
 */
router.get('/:id', cookieJwtAuth, getOneChargeSt);

/**
 * put route for update one chargestation
 */
router.put('/:id', cookieJwtAuth, updateOneChargeSt);


/**
 * post route for creating a new chargestation
 */
router.post('/', cookieJwtAuth, createChargeSt);



module.exports = router;
