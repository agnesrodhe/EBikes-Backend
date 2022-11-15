const express = require('express');
const router = express.Router();
const { getPrices } = require("../controllers/prices")

/**
 * get route for getting pricelist
 */
router.get('/', getPrices)




module.exports = router;