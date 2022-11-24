const Bike = require('../models/Bike');

async function addbikes(longmin, longmax, latmin, latmax) {
    let named = 'BorlängeBike-'

    let city = '637e2a5a22f175ffd136d0d7'

    for (var i = 50; i < 100; i++) {
        let lat = Math.random() * (latmax - latmin) + latmin;
        let long = Math.random() * (longmax - longmin) + longmin;
        let name = named + i.toString()
        await Bike.create({
            name, maxspeed: 30, speed: 0, batterylevel: 100, active: true, history: [], location: {
                type: "Point",
                coordinates: [
                    long,
                    lat
                ]
            }, inCity: city
        }
        );
    }
};

async function deleteBikes() {
    await Bike.deleteMany({ active: false })
}

module.exports = {
    addbikes,
    deleteBikes
}
