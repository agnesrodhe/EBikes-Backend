const express = require('express');
const router = express.Router();
const { getPrices } = require("../controllers/prices");
const { cookieJwtAuth } = require('../middleware/jwtAuth');

/**
 * get route for getting pricelist
 */
router.get('/', cookieJwtAuth, getPrices);





module.exports = router;
