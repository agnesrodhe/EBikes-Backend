const express = require('express');
const router = express.Router();
const { getAllCities, createCity, getOneCity } = require("../controllers/city")

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


module.exports = router;