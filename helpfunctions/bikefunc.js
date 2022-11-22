const Bike = require('../models/Bike');

async function addbikes(longmin, longmax, latmin, latmax) {
    let named = 'Bike-'

    let city = '637c7018050e0887ebe8b491'

    for (var i = 1; i < 10; i++) {
        let lat = Math.random() * (latmax - latmin) + latmin;
        let long = Math.random() * (longmax - longmin) + longmin;
        let name = named + i.toString()
        await Bike.create({
            name, maxspeed: 30, speed: 0, batterylevel: 100, history: [], location: {
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
