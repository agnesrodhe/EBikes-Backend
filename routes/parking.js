const express = require('express');
const router = express.Router();
const { createParking, getAllParking, getAllParkingInCity } = require("../controllers/parking")

/**
 * get route for getting all parking places
 */
router.get('/', getAllParking)


/**
 * get route for all parkingin a city
 */
router.get('/city/:cityId', getAllParkingInCity)


/**
 * post route for creating a new Parking
 */
router.post('/', createParking)





module.exports = router;