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

/**
 * Arrow function to update the pricelist.
 *
 * @param {*} req
 * @param {*} res
 */
const updatePrices = async (req, res) => {
    res.send("NOT IMPLEMENTED: update price list");
    // const id = req.params.id;
    // Price.findByIdAndUpdate(id, req.body, function (err) {
    //     console.log(err);
    //     if (err){
    //     }
    //     res.status(404).json({error: error.message});
    // }
    // else{
    //     res.status(200).json();
    // }
    // });
};



module.exports = {
    getPrices,
    updatePrices
};
