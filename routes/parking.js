const express = require('express');
const router = express.Router();
const { createParking, getAllParking, getAllParkingInCity, getOneParking, updateOneParking } = require("../controllers/parking")

/**
 * get route for getting all parking places
 */
router.get('/', getAllParking)

/**
 * get route for getting one parking
 */
router.get('/:id', getOneParking)


/**
 * get route for all parkingin a city
 */
router.get('/city/:cityId', getAllParkingInCity)


/**
 * post route for creating a new Parking
 */
router.post('/', createParking)

/**
 * put route for update one parking
 */
router.put('/:id', updateOneParking)





module.exports = router;