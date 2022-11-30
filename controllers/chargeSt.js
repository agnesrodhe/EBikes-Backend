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
    const { name, location, inCity } = req.body;

    try {
        const chargest = await ChargeSt.create({ name, location, inCity });

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

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * Get one chargestation
 * 
 */
const getOneChargeSt = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No chargest with that id' });
    }

    const charge = await ChargeSt.findById(id);

    if (!charge) {
        return res.status(404).json({ error: 'No charge station with that id' });
    }

    res.status(200).json(charge);
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns json with new updated document
 * 
 * update one chargestation
 */

const updateOneChargeSt = async (req, res) => {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No chargestation with that id' });
    }

    let thingsToUpdate = {
        $set: {
            name: req.body.name,
            location: req.body.location,
            inCity: req.body.inCity
        }

    }

    try {
        await ChargeSt.findByIdAndUpdate(id, thingsToUpdate);
        const charge = await ChargeSt.findById(id);

        res.status(200).json(charge);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}



module.exports = {
    createChargeSt,
    getAllChargeSt,
    getAllChargeStInCity,
    getOneChargeSt,
    updateOneChargeSt,
}

