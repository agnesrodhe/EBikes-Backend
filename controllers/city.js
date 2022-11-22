const mongoose = require('mongoose');
const City = require('../models/City')
const Bike = require('../models/Bike')


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
const addCity = async (req, res) => {
    const { name, location } = req.body;

    //add doc to db
    try {
        const city = await City.create({ name, location });

        res.status(201).json(city);
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

/**
 * arrow func for deleting a city
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */

const deleteOneCity = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such id' });
    }

    const response = await City.findByIdAndRemove(id);

    if (!response) {
        return res.status(404).json({ error: 'No such id' });
    }

    res.status(204).json();
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * Getting all bikes in a city looking for the Incity id, ref City
 * 
 */
const getAllBikesInCity = async (req, res) => {

    console.log(req.params.id)

    const bikesinCity = await Bike.find({ inCity: req.params.id });

    res.status(200).json(bikesinCity);

}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * Getting all bikes in a city looking for the Incity id, ref City
 * 
 */
const getAllNonActiveBikesInCity = async (req, res) => {

    console.log(req.params.id)

    const bikesinCity = await Bike.find({ inCity: req.params.id, active: false });

    res.status(200).json(bikesinCity);

}

module.exports = {
    getAllCities,
    addCity,
    getOneCity,
    deleteOneCity,
    getAllBikesInCity,
    getAllNonActiveBikesInCity
}