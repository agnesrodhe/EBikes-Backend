require('dotenv').config();
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
    jest.restoreAllMocks()
    for (let collection of collections) {
        await collection.deleteMany();
    }
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
});


describe("API PRICES. ROUTES TEST", () => {
    describe("Get route working when database is empty", () => {

        const jwtSpy = jest.spyOn(jwt, 'verify');
        jwtSpy.mockReturnValue('Some decoded token');

        it("should return status 200", async () => {
            const { statusCode, body } = await request(app).get(
                `/v1/prices`).set('Cookie', `github-jwt='some decoded token'`

                );

            expect(body).toHaveLength(0);
            expect(statusCode).toBe(200);
        });
    });

    describe("Get route when there is  no cookie set", () => {
        it("should return status 403", async () => {
            const { statusCode, body } = await request(app).get(
                `/v1/prices`);



            expect(statusCode).toBe(403);
            expect(body.error).toEqual("no valid token")
        });
    });

    describe("Update pricelist with wrong mongoose id", () => {
        it("should return 404", async () => {
            const jwtSpy = jest.spyOn(jwt, 'verify');
            jwtSpy.mockReturnValue('Some decoded token');
            const res = await request(app).put(
                `/v1/prices/123456`).set('Cookie', `github-jwt='some decoded token'`
                );

            expect(res.statusCode).toBe(404);
            expect(res.body).toEqual({ error: "Not valid mongoose id" });
        });
    });

})