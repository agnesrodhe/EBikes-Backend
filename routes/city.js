const express = require('express');
const router = express.Router();
const { getAllCities, addCity, getOneCity, deleteOneCity, getAllBikesInCity, getAllNonActiveBikesInCity } = require("../controllers/city")

/**
 * get route for getting all cities
 */
router.get('/', getAllCities)

/**
 * post route for creating a new city
 */
router.post('/', addCity)

/**
 * Get route for getting one single city with req.params
 */
router.get('/:id', getOneCity)

/**
 * Delete route for deleting one city with req.params
 */
router.delete('/:id', deleteOneCity)




module.exports = router;