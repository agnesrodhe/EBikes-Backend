const express = require('express');
const router = express.Router();
const { getAllCustomers, getOneCustomer } = require("../controllers/users");
const { cookieJwtAuth } = require('../middleware/jwtAuth');

router.get('/', cookieJwtAuth, getAllCustomers);

router.get('/:id', cookieJwtAuth, getOneCustomer);


module.exports = router;
