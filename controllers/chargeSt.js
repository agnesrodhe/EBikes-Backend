const mongoose = require('mongoose');
const ChargeSt = require('../models/ChargeSt')

/**
 * 
 * @param {*} req 
 * @param {*} res
 * 
 * get every chargestation in Collection 
 */
const getAllChargeSt = async (req, res) => {
    const chargeSt = await ChargeSt.find({});

    res.status(200).json(chargeSt);
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * create a chargingstation
 */


const createChargeSt = async (req, res) => {
    const { name, location, bikes, inCity } = req.body;

    try {
        const chargest = await ChargeSt.create({ name, location, bikes, inCity });

        res.status(200).json(chargest);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * Get all charge stations in a city
 * 
 */
const getAllChargeStInCity = async (req, res) => {
    const { cityId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(cityId)) {
        return res.status(404).json({ error: 'No city with that id' });
    }

    const chargeStInCity = await ChargeSt.find({ inCity: req.params.cityId });

    if (chargeStInCity.length == 0) {
        return res.status(404).json({ error: 'No chargeSt areas in this city' });
    }

    res.status(200).json(chargeStInCity);
}
module.exports = {
    createChargeSt,
    getAllChargeSt,
    getAllChargeStInCity
}

