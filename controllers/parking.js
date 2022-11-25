const mongoose = require('mongoose');
const Parking = require('../models/Parking')

/**
 * 
 * @param {*} req 
 * @param {*} res
 * 
 * get all parkingareas. 
 */
const getAllParking = async (req, res) => {
    const parking = await Parking.find({});

    res.status(200).json(parking);
};

/**
 * 
 * @param {*} req 
 * @param {*} res
 * 
 * create a new parkingarea 
 */

const createParking = async (req, res) => {
    const { name, location, bikes, inCity } = req.body;


    try {
        const parking = await Parking.create({ name, location, bikes, inCity });

        res.status(200).json(parking);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * Get all parking in a city
 * 
 */
const getAllParkingInCity = async (req, res) => {
    const { cityId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(cityId)) {
        return res.status(404).json({ error: 'No city with that id' });
    }

    const parkingInCity = await Parking.find({ inCity: req.params.cityId });

    if (parkingInCity.length == 0) {
        return res.status(404).json({ error: 'No parking areas in this city' });
    }

    res.status(200).json(parkingInCity);
}



module.exports = {
    createParking,
    getAllParking,
    getAllParkingInCity
}
