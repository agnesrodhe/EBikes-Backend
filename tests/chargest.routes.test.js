require('dotenv').config();
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


describe("API CHARGEST. ROUTES TEST", () => {
    describe("Get route working when database is empty", () => {
        it("should return status 200", async () => {
            const { statusCode, body } = await request(app).get(
                `/v1/chargestations`).set('Cookie', `github-jwt=${token}`

                );

            expect(body).toHaveLength(0);
            expect(statusCode).toBe(200);
        });
    });

    describe("Get route when there is  no cookie set", () => {
        it("should return status 403", async () => {
            const { statusCode, body } = await request(app).get(
                `/v1/chargestations`);



            expect(statusCode).toBe(403);
            expect(body.error).toEqual("no valid token")
        });
    });


    describe("Get and post route working when database have 1 chargest", () => {
        it("should return status 200", async () => {
            await request(app).post(
                `/v1/chargestations`).send({
                    name: 'chargest-1', location: {
                        coordinates: [
                            10,
                            60
                        ],
                        type: "Point"
                    }
                }).set('Cookie', `github-jwt=${token}`

                );

            const { statusCode, body } = await request(app).get(
                `/v1/chargestations`).set('Cookie', `github-jwt=${token}`

                );

            expect(body).toHaveLength(1);
            expect(statusCode).toBe(200);
        });
    });

    describe("Post route with wrong informations", () => {
        it("should return status 400", async () => {
            let { statusCode, body } = await request(app).post(
                `/v1/chargestations`).send({

                }).set('Cookie', `github-jwt=${token}`

                );
            const expected = { error: '/location/' };

            expect(statusCode).toBe(400);
            expect(body.error).toMatch(/failed/);
        });
    });


    describe("Get chargeSt in city with wrong mongoose id", () => {
        it("should return 404", async () => {
            const res = await request(app).get(
                `/v1/chargestations/city/123456`).set('Cookie', `github-jwt=${token}`

                );

            expect(res.statusCode).toBe(404);
            expect(res.body).toEqual({ error: "Not valid mongoose id" });
        });
    });





    describe("Get chargeSt in city with valid mongoose id but it dosent exist", () => {
        it("should return 404 and error message", async () => {
            const res = await request(app).get(
                `/v1/chargestations/city/${mongoId}`).set('Cookie', `github-jwt=${token}`

                );

            expect(res.statusCode).toBe(404);
            expect(res.body).toEqual({ error: "No chargeSt areas in this city" });
        });
    });

    describe("Get chargeSt in city with success", () => {
        it("should return 200 and object", async () => {
            let chargest1 = await request(app).post(
                `/v1/chargestations`).send({
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
                `/v1/chargestations/city/${chargest1.body.inCity}`).set('Cookie', `github-jwt=${token}`

                );

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveLength(1);
        });
    });

    describe("Get chargeSt with wrong mongoose id", () => {
        it("should return 404", async () => {
            const res = await request(app).get(
                `/v1/chargestations/11234`).set('Cookie', `github-jwt=${token}`

                );
            ;

            expect(res.statusCode).toBe(404);
            expect(res.body).toEqual({ error: "Not valid mongoose id" });
        });
    });

    describe("Get ONE chargeSt with success", () => {
        it("should return 200 and 1 object", async () => {
            let chargest1 = await request(app).post(
                `/v1/chargestations`).send({
                    name: 'chargest-1', location: {
                        coordinates: [
                            15.2,
                            60.2
                        ],
                        type: "Point"

                    },
                }).set('Cookie', `github-jwt=${token}`);

            const res = await request(app).get(
                `/v1/chargestations/${chargest1.body._id}`).set('Cookie', `github-jwt=${token}`

                );

            expect(res.statusCode).toBe(200);
            expect(res.body.name).toBe('chargest-1');
        });
    });

    describe("Get ONE chargeSt which dosnt exists", () => {
        it("should return 400 and error message", async () => {
            const res = await request(app).get(
                `/v1/chargestations/${mongoId}`).set('Cookie', `github-jwt=${token}`

                );

            expect(res.statusCode).toBe(404);
            expect(res.body.error).toBe('No charge station with that id');
        });
    });

    describe("Update chargeSt with sucess", () => {
        it("should return 200", async () => {
            let charge = await request(app).post(
                `/v1/chargestations`).send({
                    name: 'charge-1', location: {
                        coordinates: [
                            15.406620337844089,
                            60.48326612849246
                        ],
                        type: "Point"

                    }
                }).set('Cookie', `github-jwt=${token}`

                );

            let charge2 = await request(app).put(
                `/v1/chargestations/${charge.body._id}`).send({
                    name: 'charge-update', location: {
                        coordinates: [
                            15.3,
                            60.3
                        ],
                        type: "Point"

                    }
                }).set('Cookie', `github-jwt=${token}`

                );

            expect(charge2.statusCode).toBe(200);
            expect(charge2.body.name).toBe('charge-update');
        });
    });

    describe("Update chargeSt with a not valid mongoose id", () => {
        it("should return 404", async () => {
            const res = await request(app).put(
                `/v1/chargestations/11234`).set('Cookie', `github-jwt=${token}`

                );

            expect(res.statusCode).toBe(404);
            expect(res.body).toEqual({ error: "Not valid mongoose id" });
        });
    });
});
