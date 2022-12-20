const Price = require('../models/Prices');
const mongoose = require('mongoose');

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

const updatePrices = async (req, res) => {
    const { priceId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(priceId)) {
        return res.status(404).json({ error: 'Not valid mongoose id' });
    }

    let thingsToUpdate = {
        $set: {
            startfee: req.body.startfee,
            penaltyfee: req.body.penaltyfee,
            minutetaxa: req.body.minutetaxa,
            bonus: req.body.bonus
        }
    };

    try {
        await Price.findByIdAndUpdate(priceId, thingsToUpdate);
        const price = await Price.findById(priceId);

        res.status(200).json(price);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}



module.exports = {
    getPrices,
    updatePrices
};
