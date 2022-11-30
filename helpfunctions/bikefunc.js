const Bike = require('../models/Bike');

async function addbikes(longmin, longmax, latmin, latmax) {
    let named = 'BorlängeBike-'

    let city = '637e2a5a22f175ffd136d0d7'

    let parkstation = '637e2fe3df042bc13280d24d'

    for (var i = 1; i < 10; i++) {
        let lat = Math.random() * (latmax - latmin) + latmin;
        let long = Math.random() * (longmax - longmin) + longmin;
        let name = named + i.toString()
        await Bike.create({
            name, maxspeed: 30, parked: parkstation, speed: 0, batterylevel: 100, location: {
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

async function updateManyBikes() {
    await Bike.updateMany({ maxspeed: 30 }, { parked: null });
}

async function deleteBikes() {
    await Bike.deleteMany({ maxspeed: 30 })
}

module.exports = {
    addbikes,
    deleteBikes,
    updateManyBikes
}
