const Bike = require('../models/Bike');
const User = require('../models/User')

async function addbikes(longmin, longmax, latmin, latmax) {
    let named = 'VisbyBike-';

    let city = '6378989b6a6403d2a9c6edb1';

    let parkstation = '63a1629279cf66cd25267b99';

    for (var i = 201; i < 301; i++) {
        let lat = Math.random() * (latmax - latmin) + latmin;
        let long = Math.random() * (longmax - longmin) + longmin;

        let name = named + i.toString();

        await Bike.create({
            name, maxspeed: 30, status: 'needService', speed: 0, batterylevel: 60, location: {
                type: "Point",
                coordinates: [
                    long,
                    lat
                ]
            }, inCity: city
        }
        );
    }
}


async function addbikesAtParkSt() {
    let named = 'VisbyBike-';

    let city = '6378989b6a6403d2a9c6edb1';

    let parkstation = '63a1629679cf66cd25267bbb';

    let charge = '63a41ab27e29fc179420b114'

    let long = 18.330345766757258

    let lat = 57.6193372192702



    for (var i = 391; i < 401; i++) {


        let name = named + i.toString();

        await Bike.create({
            name, maxspeed: 30, charging: charge, status: 'needService', speed: 0, batterylevel: 14, location: {
                type: "Point",
                coordinates: [
                    long,
                    lat
                ]
            }, inCity: city
        }
        );
    }
}


async function updateManyBikes() {
    await Bike.updateMany({ maxspeed: 30 }, { parked: null });
}

async function deleteBikes() {
    await User.deleteMany({ role: 'customer' });
}

module.exports = {
    addbikes,
    deleteBikes,
    updateManyBikes,
    addbikesAtParkSt
};
