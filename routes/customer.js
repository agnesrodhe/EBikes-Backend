const express = require('express');
const router = express.Router();
const { getAllCustomers, getOneCustomer } = require("../controllers/users");

router.get('/', getAllCustomers);

router.get('/:id', getOneCustomer);


module.exports = router;
