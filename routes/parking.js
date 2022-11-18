const express = require('express');
const router = express.Router();
const { createParking, getAllParking } = require("../controllers/parking")

/**
 * get route for getting all parking places
 */
router.get('/', getAllParking)
/**
 * post route for creating a new Parking
 */
router.post('/', createParking)



module.exports = router;