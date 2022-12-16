const mongoose = require('mongoose');
const Parking = require('../models/Parking');

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
 * Get one parking
 *
 */
const getOneParking = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Not valid mongoose id' });
    }

    const parking = await Parking.findById(id);

    if (!parking) {
        return res.status(404).json({ error: 'No parking station with that id' });
    }

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
    const { name, location, inCity } = req.body;

    try {
        const parking = await Parking.create({ name, location, inCity });

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
        return res.status(404).json({ error: 'Not valid mongoose id' });
    }

    const parkingInCity = await Parking.find({ inCity: req.params.cityId });

    if (parkingInCity.length == 0) {
        return res.status(404).json({ error: 'No parking areas in this city' });
    }

    res.status(200).json(parkingInCity);
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns json with new updated document
 *
 * update one prking
 */

const updateOneParking = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Not valid mongoose id' });
    }

    let thingsToUpdate = {
        $set: {
            name: req.body.name,
            location: req.body.location,
            inCity: req.body.inCity
        }
    };

    try {
        await Parking.findByIdAndUpdate(id, thingsToUpdate);
        const parking = await Parking.findById(id);

        res.status(200).json(parking);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



module.exports = {
    createParking,
    getAllParking,
    getOneParking,
    getAllParkingInCity,
    updateOneParking
};
