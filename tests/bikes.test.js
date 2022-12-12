const request = require('supertest');
const app = require('../app');
const { MongoMemoryServer } = require("mongodb-memory-server");
const { default: mongoose } = require('mongoose');
const jwt = require('jsonwebtoken');

let mongodb = null;

const mongoId = new mongoose.Types.ObjectId().toString();

beforeAll(async () => {
    mongodb = await MongoMemoryServer.create();
    await mongoose.connect(mongodb.getUri());
});

afterEach(async () => {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        await collection.deleteMany();
    }
});


afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
});


describe("API BIKE ROUTES TEST", () => {
    describe("Get route working when database is empty", () => {
        it("should return status 200", async () => {
            const { statusCode, body } = await request(app).get(
                `/v1/bikes`);

            expect(body).toHaveLength(0);
            expect(statusCode).toBe(200);
        });
    });

    describe("Get route working when database is not empty", () => {
        it("should return status 200", async () => {
            const res = await request(app).post(
                `/v1/bikes`).send({
                name: 'bike-1', location: {
                    coordinates: [
                        15.406620337844089,
                        60.48326612849246
                    ],
                    type: "Point"
                }
            });

            const { statusCode, body } = await request(app).get(
                `/v1/bikes`);

            expect(body).toHaveLength(1);
            expect(statusCode).toBe(200);
        });
    });

    describe("Get route when there is  middleware", () => {
        it("should return status 403", async () => {
            const { statusCode, body } = await request(app).get(
                `/v1/prices`);



            expect(statusCode).toBe(403);
        });
    });

    describe("GET ONE BIKE  ON WITH RIGHT ID", () => {
        it("should return 200 and location type", async () => {
            const created = await request(app).post(
                `/v1/bikes`).send({
                name: 'bike-test', location: {
                    coordinates: [
                        15.306620337844089,
                        60.38326612849246
                    ],
                    type: "Point"
                }
            });
            const res = await request(app).get(
                `/v1/bikes/${created.body._id}`);



            expect(res.statusCode).toBe(200);
        });
    });


    describe("GET ONE BIKE  WITH NO MONGOOSE ID", () => {
        it("should return 404", async () => {
            await request(app).post(
                `/v1/bikes`).send({
                name: 'bike-test1', location: {
                    coordinates: [
                        15.306620337844089,
                        60.38326612849246
                    ],
                    type: "Point"
                }
            });

            const res = await request(app).get(
                `/v1/bikes/123`);

            expect(res.statusCode).toBe(404);
            expect(res.body).toEqual({ error: "Not mongoose id" });
        });
    });

    describe("GET ONE BIKE NOT IN DATABASE", () => {
        it("should return 404 ", async () => {
            const res = await request(app).get(
                `/v1/bikes/${mongoId}`);



            expect(res.statusCode).toBe(404);
            expect(res.body).toEqual({ error: 'No bike with that id' });
        });
    });

    describe("POST ROUTE ADD bike", () => {
        it("should return 200 and location type", async () => {
            const res = await request(app).post(
                `/v1/bikes`).send({
                name: 'bike-1', location: {
                    coordinates: [
                        15.406620337844089,
                        60.48326612849246
                    ],
                    type: "Point"
                }
            });


            expect(res.statusCode).toBe(200);
            expect(res.body.location.type).toBe("Point");
        });
    });
    describe("POST ROUTE ADD bike when no location is given", () => {
        it("should return 400", async () => {
            const res = await request(app).post(
                `/v1/bikes`).send({
                name: 'bike-1'
            });


            expect(res.statusCode).toBe(400);
        });
    });
    describe("GET ONE BIKE IN CITY WITH CITY ID NOT BEING MONGOOSE ID", () => {
        it("should return 404", async () => {
            const res = await request(app).get(
                `/v1/bikes/city/123`);

            expect(res.statusCode).toBe(404);
            expect(res.body).toEqual({ error: "Not valid mongoose id" });
        });
    });

    describe("GET ALL BIKES IN CITY WITH RIGHT CITYID", () => {
        it("should return 200 and right city id", async () => {
            const mongoId = new mongoose.Types.ObjectId();
            let bike = await request(app).post(
                `/v1/bikes`).send({
                name: 'bike-1', location: {
                    coordinates: [
                        15.406620337844089,
                        60.48326612849246
                    ],
                    type: "Point"

                },
                inCity: mongoId
            });

            const res = await request(app).get(
                `/v1/bikes/city/${bike.body.inCity}`);

            let recive = res.body[0].name;

            expect(res.statusCode).toBe(200);
            expect(recive).toBe('bike-1');
        });
    });

    describe("GET BIKES IN CITY WITH NO BIKES", () => {
        it("should return 404", async () => {
            const mongoId = new mongoose.Types.ObjectId().toString();

            const res = await request(app).get(
                `/v1/bikes/city/${mongoId}`);

            expect(res.statusCode).toBe(404);
            expect(res.body).toEqual({ error: "No bikes in this city" });
        });
    });

    describe("GET ALL NON ACTIVE BIKES WITH A NON MONGOOSE ID", () => {
        it("should return 404", async () => {
            const res = await request(app).get(
                `/v1/bikes/city/12345678908/nonActive`);

            expect(res.statusCode).toBe(404);
            expect(res.body).toEqual({ error: "Not valid mongoose id" });
        });
    });


    describe("GET ALL NON ACTIVE BIKES WHEN THERE IS NON", () => {
        it("should return 404", async () => {
            const mongoId = new mongoose.Types.ObjectId();

            const res = await request(app).get(
                `/v1/bikes//city/${mongoId}/nonActive`);

            expect(res.statusCode).toBe(404);
            expect(res.body).toEqual({ error: "Only active bikes in this city" });
        });
    });

    describe("GET ALL NON ACTIVE BIKES IN A CITY", () => {
        it("should return 200 and length of 1", async () => {
            const mongoId = new mongoose.Types.ObjectId();
            let bike1 = await request(app).post(
                `/v1/bikes`).send({
                name: 'bike-1', location: {
                    coordinates: [
                        15.406620337844089,
                        60.48326612849246
                    ],
                    type: "Point"

                },
                inCity: mongoId,
                active: null
            });

            let bike2 = await request(app).post(
                `/v1/bikes`).send({
                name: 'bike-2', location: {
                    coordinates: [
                        15.106620337844089,
                        60.18326612849246
                    ],
                    type: "Point"

                },
                inCity: mongoId,
                active: null
            });

            const res = await request(app).get(
                `/v1/bikes/city/${mongoId}/nonActive`);

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveLength(2);
            expect(res.body[0].active).toBe(null);
        });
    });





    describe("GET ALL ACTIVE BIKES WITH A NON MONGOOSE ID", () => {
        it("should return 404", async () => {
            const res = await request(app).get(
                `/v1/bikes/city/12345678908/active`);

            expect(res.statusCode).toBe(404);
            expect(res.body).toEqual({ error: "Not valid mongoose id" });
        });
    });


    describe("GET ALL ACTIVE BIKES WHEN THERE IS NON", () => {
        it("should return 404", async () => {
            const mongoId = new mongoose.Types.ObjectId();

            const res = await request(app).get(
                `/v1/bikes//city/${mongoId}/active`);

            expect(res.statusCode).toBe(404);
            expect(res.body).toEqual({
                error: "No active bikes in this city"
            });
        });
    });

    describe("GET ALL ACTIVE BIKES IN A CITY", () => {
        it("should return 200 and length of 2", async () => {
            const mongoId = new mongoose.Types.ObjectId();
            const userId = new mongoose.Types.ObjectId();
            const userID2 = new mongoose.Types.ObjectId();
            let bike1 = await request(app).post(
                `/v1/bikes`).send({
                name: 'bike-1', location: {
                    coordinates: [
                        15.406620337844089,
                        60.48326612849246
                    ],
                    type: "Point"

                },
                inCity: mongoId,
                active: userId
            });

            let bike2 = await request(app).post(
                `/v1/bikes`).send({
                name: 'bike-2', location: {
                    coordinates: [
                        15.106620337844089,
                        60.18326612849246
                    ],
                    type: "Point"

                },
                inCity: mongoId,
                active: userID2
            });

            const res = await request(app).get(
                `/v1/bikes/city/${mongoId}/active`);

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveLength(2);
            expect(res.body[0].active).not.toBe(null);
        });
    });


    describe("UPDATE BIKES WITH A NON MONGOOSE ID", () => {
        it("should return 404", async () => {
            const res = await request(app).put(
                `/v1/bikes/123456`);

            expect(res.statusCode).toBe(404);
            expect(res.body).toEqual({ error: "Not valid mongoose id" });
        });
    });


    describe("UPDATE BIKES WITH SUCCESS", () => {
        it("should return 200", async () => {
            let bike = await request(app).post(
                `/v1/bikes`).send({
                name: 'bike-1', location: {
                    coordinates: [
                        15.406620337844089,
                        60.48326612849246
                    ],
                    type: "Point"

                },
                inCity: mongoId,
                active: null
            });

            let bike1 = await request(app).put(
                `/v1/bikes/${bike.body._id}`).send({
                name: 'bike-update', location: {
                    coordinates: [
                        15.3,
                        60.3
                    ],
                    type: "Point"

                }
            });

            expect(bike1.statusCode).toBe(200);
            expect(bike1.body.name).toBe('bike-update');
        });
    });


    describe("DELETE BIKES WITH SUCCESS", () => {
        it("should return 204", async () => {
            let bike = await request(app).post(
                `/v1/bikes`).send({
                name: 'bike-1', location: {
                    coordinates: [
                        15.406620337844089,
                        60.48326612849246
                    ],
                    type: "Point"

                },
                inCity: mongoId,
                active: null
            });

            let bike1 = await request(app).delete(
                `/v1/bikes/${bike.body._id}`);

            expect(bike1.statusCode).toBe(204);
        });
    });

    describe("DELETE BIKES WITH NOT MONGOOSE ID", () => {
        it("should return 404", async () => {
            let bike = await request(app).post(
                `/v1/bikes`).send({
                name: 'bike-1', location: {
                    coordinates: [
                        15.406620337844089,
                        60.48326612849246
                    ],
                    type: "Point"

                },
                inCity: mongoId,
                active: null
            });

            let bike1 = await request(app).delete(
                `/v1/bikes/1234`);

            expect(bike1.statusCode).toBe(404);
            expect(bike1.body).toEqual({ error: "Not valid mongoose id" });
        });
    });

    describe("DELETE BIKES THATS DOSENT EXISTS", () => {
        it("should return 404", async () => {
            const mongoId = new mongoose.Types.ObjectId().toString();
            let bike1 = await request(app).delete(
                `/v1/bikes/${mongoId}`);

            expect(bike1.statusCode).toBe(404);
            expect(bike1.body).toEqual({ error: "No such id" });
        });
    });
});
