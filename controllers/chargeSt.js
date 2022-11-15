const ChargeSt = require('../models/ChargeSt')

const createChargeSt = async (req, res) => {
    const { name, location, bikes, inCity } = req.body;

    //add doc to db
    try {
        const chargest = await ChargeSt.create({ name, location, bikes, inCity });

        res.status(200).json(chargest);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


module.exports = {
    createChargeSt
}

