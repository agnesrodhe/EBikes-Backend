const express = require('express');
const router = express.Router();
const { createBike, getAllBikes, getOneBike, getAllBikesInCity, getAllActiveBikesInCity, getAllNonActiveBikesInCity } = require("../controllers/bike");


/**
 * get route for getting all bikes
 */
router.get('/', getAllBikes)


/**
 * get route for getting all bikes
 */
router.get('/:bikeId', getOneBike)

/**
 * get route for all bikes in a city
 */
router.get('/city/:cityId', getAllBikesInCity)

/**
 * get route for all non-active bikes in a city
 */
router.get('/city/:cityId/nonActive', getAllNonActiveBikesInCity)

/**
 * get route for all active bikes in a city
 */
router.get('/city/:cityId/active', getAllActiveBikesInCity)

/**
 * post route for creating a new bike
 */
router.post('/', createBike)



module.exports = router;