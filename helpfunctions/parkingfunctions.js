const Parking = require('../models/Parking');


async function addparking(longmin, longmax, latmin, latmax) {
    let named = 'BorlängeParking-';

    for (var i = 1; i < 6; i++) {
        let lat = Math.random() * (latmax - latmin) + latmin;
        let long = Math.random() * (longmax - longmin) + longmin;
        let name = named + i.toString();

        await Parking.create({
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
    addparking
};
