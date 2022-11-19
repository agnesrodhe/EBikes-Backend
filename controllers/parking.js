const Parking = require('../models/Parking')

const getAllParking = async (req, res) => {
    const parking = await Parking.find({});

    res.status(200).json(parking);
};

const createParking = async (req, res) => {
    const { name, location, bikes, inCity } = req.body;

    //add doc to db
    try {
        const parking = await Parking.create({ name, location, bikes, inCity });

        res.status(200).json(parking);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createParking,
    getAllParking
}
