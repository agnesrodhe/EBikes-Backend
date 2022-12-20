const request = require('supertest');
const app = require('../app');
const { MongoMemoryServer } = require("mongodb-memory-server");
const { default: mongoose } = require('mongoose');
const jwt = require('jsonwebtoken');

let mongodb = null;

const mongoId = new mongoose.Types.ObjectId().toString();


let userPayload = {
    username: 'Maria',
    _id: mongoId
}

let userId = userPayload._id

let token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '1d',
})

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


describe("API PARKING. ROUTES TEST", () => {
    describe("Get route working when database is empty", () => {
        it("should return status 200", async () => {
            const { statusCode, body } = await request(app).get(
                `/v1/parking`).set('Cookie', `github-jwt=${token}`

                );

            expect(body).toHaveLength(0);
            expect(statusCode).toBe(200);
        });
    });

    describe("Get and post route working when database have 1 chargest", () => {
        it("should return status 200", async () => {
            await request(app).post(
                `/v1/parking`).send({
                    name: 'parking-1', location: {
                        coordinates: [
                            10,
                            60
                        ],
                        type: "Point"
                    }
                }).set('Cookie', `github-jwt=${token}`

                );

            const { statusCode, body } = await request(app).get(
                `/v1/parking`).set('Cookie', `github-jwt=${token}`

                );

            expect(body).toHaveLength(1);
            expect(statusCode).toBe(200);
        });
    });

    describe("Post route with wrong informations", () => {
        it("should return status 400", async () => {
            let { statusCode, body } = await request(app).post(
                `/v1/parking`).send({

                }).set('Cookie', `github-jwt=${token}`

                );

            expect(statusCode).toBe(400);
            expect(body.error).toMatch(/failed/);
        });
    });


    describe("Get Parking spot in city with wrong mongoose id", () => {
        it("should return 404", async () => {
            const res = await request(app).get(
                `/v1/parking/city/123456`).set('Cookie', `github-jwt=${token}`

                );

            expect(res.statusCode).toBe(404);
            expect(res.body).toEqual({ error: "Not valid mongoose id" });
        });
    });





    describe("Get parking spot in city with valid mongoose id but it dosent exist", () => {
        it("should return 404 and error message", async () => {
            const res = await request(app).get(
                `/v1/parking/city/${mongoId}`).set('Cookie', `github-jwt=${token}`

                );

            expect(res.statusCode).toBe(404);
            expect(res.body).toEqual({ error: "No parking areas in this city" });
        });
    });

    describe("Get Parking in city with success", () => {
        it("should return 200 and object", async () => {
            let parking = await request(app).post(
                `/v1/parking`).send({
                    name: 'chargest-1', location: {
                        coordinates: [
                            15.2,
                            60.2
                        ],
                        type: "Point"

                    },
                    inCity: mongoId,
                }).set('Cookie', `github-jwt=${token}`

                );

            const res = await request(app).get(
                `/v1/parking/city/${parking.body.inCity}`).set('Cookie', `github-jwt=${token}`

                );

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveLength(1);
        });
    });

    describe("Get parking spot with wrong mongoose id", () => {
        it("should return 404", async () => {
            const res = await request(app).get(
                `/v1/parking/11234`).set('Cookie', `github-jwt=${token}`

                );

            expect(res.statusCode).toBe(404);
            expect(res.body).toEqual({ error: "Not valid mongoose id" });
        });
    });

    describe("Get ONE parking spot with success", () => {
        it("should return 200 and 1 object", async () => {
            let parking = await request(app).post(
                `/v1/parking`).send({
                    name: 'parking-1', location: {
                        coordinates: [
                            15.2,
                            60.2
                        ],
                        type: "Point"

                    },
                }).set('Cookie', `github-jwt=${token}`

                );

            const res = await request(app).get(
                `/v1/parking/${parking.body._id}`).set('Cookie', `github-jwt=${token}`

                );

            expect(res.statusCode).toBe(200);
            expect(res.body.name).toBe('parking-1');
        });
    });

    describe("Get ONE parking  which dosnt exists", () => {
        it("should return 400 and error message", async () => {
            const res = await request(app).get(
                `/v1/parking/${mongoId}`).set('Cookie', `github-jwt=${token}`

                );

            expect(res.statusCode).toBe(404);
            expect(res.body.error).toBe('No parking station with that id');
        });
    });

    describe("Update parking with sucess", () => {
        it("should return 200", async () => {
            let parking = await request(app).post(
                `/v1/parking`).send({
                    name: 'parking-1', location: {
                        coordinates: [
                            15.406620337844089,
                            60.48326612849246
                        ],
                        type: "Point"

                    }
                }).set('Cookie', `github-jwt=${token}`

                );

            let updated = await request(app).put(
                `/v1/parking/${parking.body._id}`).send({
                    name: 'parking-update', location: {
                        coordinates: [
                            15.3,
                            60.3
                        ],
                        type: "Point"

                    }
                }).set('Cookie', `github-jwt=${token}`

                );

            expect(updated.statusCode).toBe(200);
            expect(updated.body.name).toBe('parking-update');
        });
    });

    describe("Update parking with a not valid mongoose id", () => {
        it("should return 404", async () => {
            const res = await request(app).put(
                `/v1/parking/11234`).set('Cookie', `github-jwt=${token}`

                );

            expect(res.statusCode).toBe(404);
            expect(res.body).toEqual({ error: "Not valid mongoose id" });
        });
    });
});
