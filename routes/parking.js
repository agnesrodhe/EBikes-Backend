const express = require('express');
const router = express.Router();
const { cookieJwtAuth } = require('../middleware/jwtAuth');
const
    { createParking, getAllParking,
        getAllParkingInCity, getOneParking,
        updateOneParking
    } = require("../controllers/parking");

/**
 * get route for getting all parking places
 */
router.get('/', cookieJwtAuth, getAllParking);

/**
 * get route for getting one parking
 */
router.get('/:id', cookieJwtAuth, getOneParking);


/**
 * get route for all parkingin a city
 */
router.get('/city/:cityId', cookieJwtAuth, getAllParkingInCity);


/**
 * post route for creating a new Parking
 */
router.post('/', cookieJwtAuth, createParking);

/**
 * put route for update one parking
 */
router.put('/:id', cookieJwtAuth, updateOneParking);





module.exports = router;
