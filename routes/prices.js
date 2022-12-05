const express = require('express');
const router = express.Router();
const { getPrices, updatePrices } = require("../controllers/prices")
const { cookieJwtAuth } = require('../middleware/jwtAuth')

/**
 * get route for getting pricelist
 */
router.get('/', cookieJwtAuth, getPrices)

/**
 * route for updating pricelist
 */
router.put('/:id', updatePrices)




module.exports = router;