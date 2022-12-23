const ChargeSt = require('../models/ChargeSt');


async function addcharge(longmin, longmax, latmin, latmax) {
    let named = 'VisbyChargeSt-';

    for (var i = 1; i < 30; i++) {
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
            inCity: "6378989b6a6403d2a9c6edb1"
        });
    }
}


module.exports = {
    addcharge
};
