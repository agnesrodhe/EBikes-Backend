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


describe("API CITY ROUTES TEST", () => {
    describe("Get route working when database is empty", () => {
        it("should return status 200", async () => {
            const { statusCode, body } = await request(app).get(
                `/v1/cities`);

            expect(body).toHaveLength(0);
            expect(statusCode).toBe(200);
        });
    });

    describe("Get and post route working when database have 1 city", () => {
        it("should return status 200", async () => {
            await request(app).post(
                `/v1/cities`).send({
                name: 'Stockholm', location: {
                    "type": "Polygon",
                    "coordinates": [
                        [
                            [
                                1,
                                4
                            ],
                            [
                                1.1,
                                4.4
                            ],
                            [
                                1.2,
                                4.2
                            ],
                            [
                                1.2,
                                4.2
                            ],
                            [
                                1,
                                4
                            ]
                        ]
                    ]

                }
            });

            const { statusCode, body } = await request(app).get(
                `/v1/cities`);

            expect(body).toHaveLength(1);
            expect(statusCode).toBe(200);
        });
    });

    describe("Post route with wrong informations", () => {
        it("should return status 404", async () => {
            let { statusCode, body } = await request(app).post(
                `/v1/cities`).send({

            });

            expect(statusCode).toBe(404);
            expect(body.error).toMatch(/failed/);
        });
    });


    describe("Get city with wrong mongoose id", () => {
        it("should return 404", async () => {
            const res = await request(app).get(
                `/v1/cities/11234`);

            expect(res.statusCode).toBe(404);
            expect(res.body).toEqual({ error: "Not valid mongoose id" });
        });
    });

    describe("Get ONE CITY with success", () => {
        it("should return 200 and 1 object", async () => {
            let city = await request(app).post(
                `/v1/cities`).send({
                name: 'Stockholm', location: {
                    "type": "Polygon",
                    "coordinates": [
                        [
                            [
                                1,
                                4
                            ],
                            [
                                1.1,
                                4.4
                            ],
                            [
                                1.2,
                                4.2
                            ],
                            [
                                1.2,
                                4.2
                            ],
                            [
                                1,
                                4
                            ]
                        ]
                    ]

                }
            });


            const res = await request(app).get(
                `/v1/cities/${city.body._id}`);


            expect(res.statusCode).toBe(200);
        });
    });

    describe("Get ONE city which dosnt exists", () => {
        it("should return 404 and error message", async () => {
            const res = await request(app).get(
                `/v1/cities/${mongoId}`);

            expect(res.statusCode).toBe(404);
            expect(res.body.error).toBe('No such id');
        });
    });

    describe("Update city with sucess", () => {
        it("should return 200", async () => {
            let city = await request(app).post(
                `/v1/cities`).send({
                name: 'Stockholm', location: {
                    "type": "Polygon",
                    "coordinates": [
                        [
                            [
                                1,
                                4
                            ],
                            [
                                1.1,
                                4.4
                            ],
                            [
                                1.2,
                                4.2
                            ],
                            [
                                1.2,
                                4.2
                            ],
                            [
                                1,
                                4
                            ]
                        ]
                    ]

                }
            });

            console.log(city.body);
            let updated = await request(app).put(
                `/v1/cities/${city.body._id}`).send({
                name: 'city-update'
            });

            expect(updated.statusCode).toBe(200);
            expect(updated.body.name).toBe('city-update');
        });
    });

    describe("Update city with a not valid mongoose id", () => {
        it("should return 404", async () => {
            const res = await request(app).put(
                `/v1/cities/11234`);

            expect(res.statusCode).toBe(404);
            expect(res.body).toEqual({ error: "Not valid mongoose id" });
        });
    });

    describe("delete city with a not valid mongoose id", () => {
        it("should return 404", async () => {
            const res = await request(app).delete(
                `/v1/cities/11234`);

            expect(res.statusCode).toBe(404);
            expect(res.body).toEqual({ error: "Not valid mongoose id" });
        });
    });


    describe("delete one city which dosnt exists", () => {
        it("should return 404 and error message", async () => {
            const res = await request(app).delete(
                `/v1/cities/${mongoId}`);

            expect(res.statusCode).toBe(404);
            expect(res.body.error).toBe('No such id');
        });
    });

    describe("delete one city with success", () => {
        it("should return 204 and error message", async () => {
            let city = await request(app).post(
                `/v1/cities`).send({
                name: 'Stockholm', location: {
                    "type": "Polygon",
                    "coordinates": [
                        [
                            [
                                1,
                                4
                            ],
                            [
                                1.1,
                                4.4
                            ],
                            [
                                1.2,
                                4.2
                            ],
                            [
                                1.2,
                                4.2
                            ],
                            [
                                1,
                                4
                            ]
                        ]
                    ]

                }
            });

            const res = await request(app).delete(
                `/v1/cities/${city.body._id}`);

            expect(res.statusCode).toBe(204);
        });
    });
});
