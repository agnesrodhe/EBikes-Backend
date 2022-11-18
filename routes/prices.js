const express = require('express');
const router = express.Router();
const { getPrices, updatePrices } = require("../controllers/prices")

/**
 * get route for getting pricelist
 */
router.get('/', getPrices)

/**
 * route for updating pricelist
 */
router.put('/:id', updatePrices)




module.exports = router;