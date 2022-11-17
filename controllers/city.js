const mongoose = require('mongoose');
const City = require('../models/City')


/**
 * Arrow function to get all the cites.
 * 
 * @param {*} req 
 * @param {*} res 
 */
const getAllCities = async (req, res) => {
    const cities = await City.find({});

    res.status(200).json(cities);
};

/**
 * Arrow function for creating a new city
 * @param {*} req 
 * @param {*} res 
 */
const createCity = async (req, res) => {
    const { name, location } = req.body;

    //add doc to db
    try {
        const city = await City.create({ name, location });

        res.status(200).json(city);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

/**
 * arrow func for getting the info of one city
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */

const getOneCity = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such id' });
    }

    const city = await City.findById(id);

    if (!city) {
        return res.status(404).json({ error: 'No such id' });
    }

    res.status(200).json(city);
};

module.exports = {
    getAllCities,
    createCity,
    getOneCity
}