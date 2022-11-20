const Bike = require('../models/Bike');

const getAllBikes = async (req, res) => {
    const bikes = await Bike.find({});

    res.status(200).json(bikes);
};

const getOneBike = async (req, res) => {
    const bike = await Bike.findOne({ id: req.params.id});

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

async function addbikes(longmin, longmax, latmin, latmax) {
    let named = 'Bike-'

    for (var i = 10; i < 20; i++) {
        let lat = Math.random() * (latmax - latmin) + latmin;
        let long = Math.random() * (longmax - longmin) + longmin;
        let name = named + i.toString()
        await Bike.create({
            name, maxspeed: 30, speed: 0, batterylevel: 90, history: [], location: {
                type: "Point",
                coordinates: [
                    long,
                    lat

                ]
            }, inCity: "6378989b6a6403d2a9c6edb2"
        }
        );
    }
};





module.exports = {
    createBike,
    getAllBikes,
    addbikes,
    getOneBike
}
