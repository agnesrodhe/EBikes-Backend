const ChargeSt = require('../models/ChargeSt')

/**
 * 
 * @param {*} req 
 * @param {*} res
 * 
 * get every chargestation in Collection 
 */
const getAllChargeSt = async (req, res) => {
    const chargeSt = await ChargeSt.find({});

    res.status(200).json(chargeSt);
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * create a chargingstation
 */


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

