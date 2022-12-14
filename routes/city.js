const express = require('express');
const router = express.Router();
const { cookieJwtAuth } = require('../middleware/jwtAuth');
const
    {
        getAllCities, addCity, getOneCity,
        deleteOneCity, updateOneCity
    } = require("../controllers/city");

/**
 * get route for getting all cities
 */
router.get('/', getAllCities);

/**
 * post route for creating a new city
 */
router.post('/', cookieJwtAuth, addCity);

/**
 * Get route for getting one single city with req.params
 */
router.get('/:id', getOneCity);

/**
 * Delete route for deleting one city with req.params
 */
router.delete('/:id', cookieJwtAuth, deleteOneCity);

/**
 * PUT route for updating a city
 */

router.put('/:id', cookieJwtAuth, updateOneCity);




module.exports = router;
