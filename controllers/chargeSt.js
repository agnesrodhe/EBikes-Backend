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

module.exports = {
    createChargeSt,
    getAllChargeSt
}

