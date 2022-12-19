const express = require('express');
const router = express.Router();
const { getPrices, updatePrices } = require("../controllers/prices");
const { cookieJwtAuth } = require('../middleware/jwtAuth');

/**
 * get route for getting pricelist
 */
router.get('/', getPrices);

/**
 * put route for update price list */
router.put('/:priceId', updatePrices);



module.exports = router;
