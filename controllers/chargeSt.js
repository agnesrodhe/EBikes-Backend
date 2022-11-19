const ChargeSt = require('../models/ChargeSt')

const getAllChargeSt = async (req, res) => {
    const chargeSt = await ChargeSt.find({});

    res.status(200).json(chargeSt);
};

const createChargeSt = async (req, res) => {
    const { name, location, bikes, inCity } = req.body;

    try {
        const chargest = await ChargeSt.create({ name, location, bikes, inCity });

        res.status(200).json(chargest);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

async function addcharge(longmin, longmax, latmin, latmax) {


    for (var i = 1; i < 5; i++) {
        let lat = Math.random() * (latmax - latmin) + latmin;
        let long = Math.random() * (longmax - longmin) + longmin;
        await ChargeSt.create({
            name: `Chargest${i}`, location: {
                type: "Point",
                coordinates: [
                    long,
                    lat

                ]
            }, inCity: "6378989b6a6403d2a9c6edb2", bikes: [],
        });
    }
};



module.exports = {
    createChargeSt,
    getAllChargeSt,
    addcharge
}

