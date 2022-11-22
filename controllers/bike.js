const mongoose = require('mongoose');
const Bike = require('../models/Bike');

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * Get all bikes
 * 
 */
const getAllBikes = async (req, res) => {
    const bikes = await Bike.find({});

    res.status(200).json(bikes);
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * Get one bike
 * 
 */
const getOneBike = async (req, res) => {
    const { bikeId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(bikeId)) {
        return res.status(404).json({ error: 'No bike with that id' });
    }

    const bike = await Bike.findById({ _id: req.params.bikeId });

    if (!bike) {
        return res.status(404).json({ error: 'No bike with that id' });
    }

    res.status(200).json(bike);
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * Create bike
 * 
 */
const createBike = async (req, res) => {
    const { active, works, charging, maxspeed, speed, batterylevel, history, location, inCity } = req.body;

    try {
        const bike = await Bike.create({ active, works, charging, maxspeed, speed, batterylevel, history, location, inCity });

        res.status(200).json(bike);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * Get all bikes in a city
 * 
 */
const getAllBikesInCity = async (req, res) => {
    const { cityId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(cityId)) {
        return res.status(404).json({ error: 'No city with that id' });
    }

    const bikesInCity = await Bike.find({ inCity: req.params.cityId });

    if (bikesInCity.length == 0) {
        return res.status(404).json({ error: 'No bikes in this city' });
    }

    res.status(200).json(bikesInCity);

}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * Get all non active bikes in a city
 * 
 */
const getAllNonActiveBikesInCity = async (req, res) => {
    const { cityId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(cityId)) {
        return res.status(404).json({ error: 'No city with that id' });
    }

    const bikesInCity = await Bike.find({ inCity: req.params.cityId, active: false });

    if (bikesInCity.length == 0) {
        return res.status(404).json({ error: 'Only active bikes in this city' });
    }

    res.status(200).json(bikesInCity);

}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * Get all active bikes in a city
 * 
 */
const getAllActiveBikesInCity = async (req, res) => {
    const { cityId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(cityId)) {
        return res.status(404).json({ error: 'No city with that id' });
    }

    const bikesInCity = await Bike.find({ inCity: req.params.cityId, active: true });

    if (bikesInCity.length == 0) {
        return res.status(404).json({ error: 'No active bikes in this city' });
    }

    res.status(200).json(bikesInCity);
}


module.exports = {
    createBike,
    getAllBikes,
    getOneBike,
    getAllBikesInCity,
    getAllNonActiveBikesInCity,
    getAllActiveBikesInCity
}
