const express = require('express');
const router = express.Router();
const { createBike, getAllBikes, getOneBike } = require("../controllers/bike");


/**
 * get route for getting all bikes
 */
router.get('/', getAllBikes)


/**
 * get route for getting all bikes
 */
router.get('/:id', getOneBike)


/**
 * post route for creating a new bike
 */
router.post('/', createBike)



module.exports = router;