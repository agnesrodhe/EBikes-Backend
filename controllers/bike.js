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
    const { name, active, works, status, charging, parked, maxspeed, speed, batterylevel, history, location, goal, inCity } = req.body;

    try {
        const bike = await Bike.create({ name, active, works, status, charging, parked, maxspeed, speed, batterylevel, history, location, goal, inCity });

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
 * get all bikes with a chargstation id
 */



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

    const bikesInCity = await Bike.find({ inCity: req.params.cityId, active: null });

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

    const bikesInCity = await Bike.find({ inCity: req.params.cityId, active: { $ne: null } });

    if (bikesInCity.length == 0) {
        return res.status(404).json({ error: 'No active bikes in this city' });
    }

    res.status(200).json(bikesInCity);
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * Update a bike
 * 
 */
const updateOneBike = async (req, res) => {
    const { bikeId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(bikeId)) {
        return res.status(404).json({ error: 'No bike with that id' });
    }
    let thingsToUpdate = {
        $set: {
            name: req.body.name,
            active: req.body.active,
            status: req.body.status,
            works: req.body.works,
            charging: req.body.charging,
            parked: req.body.parked,
            maxspeed: req.body.maxspeed,
            speed: req.body.speed,
            goal: req.body.goal,
            batterylevel: req.body.batterylevel,
            location: req.body.location,
            inCity: req.body.inCity
        },
        $push: {
            history: req.body.history
        }

    }

    try {
        await Bike.findByIdAndUpdate(bikeId, thingsToUpdate);
        const bike = await Bike.findById(bikeId);

        res.status(200).json(bike);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

/**
 * arrow func to delete a bike
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */

const deleteOneBike = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such id' });
    }

    const response = await Bike.findByIdAndRemove(id);

    if (!response) {
        return res.status(404).json({ error: 'No such id' });
    }

    res.status(204).json();
};


module.exports = {
    createBike,
    getAllBikes,
    getOneBike,
    getAllBikesInCity,
    getAllNonActiveBikesInCity,
    getAllActiveBikesInCity,
    updateOneBike,
    deleteOneBike
}
