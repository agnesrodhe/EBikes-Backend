const ChargeSt = require('../models/ChargeSt');


async function addcharge(longmin, longmax, latmin, latmax) {
    let named = 'BorlängeChargeSt-';

    for (var i = 1; i < 6; i++) {
        let lat = Math.random() * (latmax - latmin) + latmin;
        let long = Math.random() * (longmax - longmin) + longmin;
        let name = named + i.toString();

        await ChargeSt.create({
            name: name,
            location: {
                type: "Point",
                coordinates: [
                    long,
                    lat

                ]
            },
            inCity: "637e2a5a22f175ffd136d0d7"
        });
    }
}


module.exports = {
    addcharge
};
