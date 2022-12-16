const Price = require('../models/Prices');

/**
 * Arrow function to get all the pricelist.
 *
 * @param {*} req
 * @param {*} res
 */
const getPrices = async (req, res) => {
    const prices = await Price.find({});

    res.status(200).json(prices);
};



module.exports = {
    getPrices
};
