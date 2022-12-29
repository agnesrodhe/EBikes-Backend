/*const Bike2 = require('../models/Bike2');
const User = require('../models/User')

async function addbikes2(longmin, longmax, latmin, latmax) {
    let named = 'BorlängeBike-';

    let city = 'Borlänge';

    for (var i = 1400; i < 3000; i++) {
        let lat = Math.random() * (latmax - latmin) + latmin;
        let long = Math.random() * (longmax - longmin) + longmin;

        let name = named + i.toString();

        await Bike2.create({
            name, maxspeed: 30, status: 'working', speed: 0, batterylevel: 40, location: {
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


async function addbikesAtParkSt2() {
    let named = 'BorlängeBike-';

    let city = 'Borlänge';

    let parkstation = '63a1629679cf66cd25267bbb';

    let charge = '63a41ab27e29fc179420b114'

    let long = 15.445841809505339

    let lat = 60.47697963120132



    for (var i = 3000; i < 3010; i++) {


        let name = named + i.toString();

        await Bike.create({
            name, maxspeed: 30, parked: 'BorlängeParking-00', status: 'needService', speed: 0, batterylevel: 14, location: {
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


async function updateManyBikes2() {
    await Bike.updateMany({ parked: '6389bb5d54dc36eb434c062b' }, { $set: { parked: 'BorlängeParking-00' } });
}

async function deleteBikes2() {
    await User.deleteMany({ role: 'customer' });
}

module.exports = {
    addbikes2,
    deleteBikes2,
    updateManyBikes2,
    addbikesAtParkSt2
};*/
