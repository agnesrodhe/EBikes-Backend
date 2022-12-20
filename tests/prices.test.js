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


describe("API PRICES. ROUTES TEST", () => {
    describe("Get route working when database is empty", () => {
        it("should return status 200", async () => {
            const { statusCode, body } = await request(app).get(
                `/v1/prices`).set('Cookie', `github-jwt=${token}`

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
            const res = await request(app).put(
                `/v1/prices/123456`).set('Cookie', `github-jwt=${token}`
                );

            expect(res.statusCode).toBe(404);
            expect(res.body).toEqual({ error: "Not valid mongoose id" });
        });
    });

})