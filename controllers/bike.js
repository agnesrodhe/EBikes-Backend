const Bike = require('../models/Bike');

const getAllBikes = async (req, res) => {
    const bikes = await Bike.find({});

    res.status(200).json(bikes);
};

const getOneBike = async (req, res) => {
    const bike = await Bike.findOne({ id: req.params.id });

    res.status(200).json(bike);
};




const createBike = async (req, res) => {
    const { active, works, charging, maxspeed, speed, batterylevel, history, location, inCity } = req.body;

    try {
        const bike = await Bike.create({ active, works, charging, maxspeed, speed, batterylevel, history, location, inCity });

        res.status(200).json(bike);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};







module.exports = {
    createBike,
    getAllBikes,
    getOneBike
}
