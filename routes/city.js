const express = require('express');
const router = express.Router();
const { getAllCities, createCity, getOneCity, deleteOneCity, getAllBikesInCity, getAllNonActiveBikesInCity } = require("../controllers/city")

/**
 * get route for getting all cities
 */
router.get('/', getAllCities)

/**
 * post route for creating a new city
 */
router.post('/', createCity)

/**
 * Get route for getting one single city with req.params
 */
router.get('/:id', getOneCity)

/**
 * Delete route for deleting one city with req.params
 */
router.delete('/:id', deleteOneCity)

/**
 * Get route for getting all bikes in a specific city
 */
router.get('/:id/bikes', getAllBikesInCity)

/**
 * Get route for getting all non active bikes in a specific city
 */
router.get('/:id/bikes/nonactive', getAllNonActiveBikesInCity)



module.exports = router;