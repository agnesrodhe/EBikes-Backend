
async function addcharge(longmin, longmax, latmin, latmax) {


    for (var i = 1; i < 5; i++) {
        let lat = Math.random() * (latmax - latmin) + latmin;
        let long = Math.random() * (longmax - longmin) + longmin;
        await ChargeSt.create({
            name: `Chargest${i}`, location: {
                type: "Point",
                coordinates: [
                    long,
                    lat

                ]
            }, inCity: "6378989b6a6403d2a9c6edb2", bikes: [],
        });
    }
};


module.exports = {

    addcharge
}
