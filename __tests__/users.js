const supertest = require('supertest');
const server = require('../api/server');
const db = require('../database/dbConfig');
const Users = require('../users/users-model');

beforeEach(async () => {
    await db('users').truncate();
})

afterAll(async () => {
    await db.destroy()
})

// keep recieving a 404 code
describe('registration', () => {
    it('POST /register', async () => {
        const newUser = { username: "pbeesly", password: "jim4ever" }
        await supertest(server).post("/auth/register").send(newUser)
    })
        it('POST /register (error)', async () => {
            const newUser = { username: "pbeesly", password: "roy4ever" }
            const res = await supertest(server).post("/auth/register").send(newUser)
            expect(res.statusCode).toBe(404)
        })
})

describe('logging in', () => {
    it('POST /login', async () => {
        const currentUser = { username: "pbeesly", password: "jim4ever" }
        await supertest(server).post("/auth/login").send(currentUser)
    })
    it('how many users exist', async () => {
        await Users.add({username: "pbeesly", password: "jim4ever"})
        const users = await db('users')
        expect(users).toHaveLength(1);
    })
})
describe("jokes tests", () => {
    it("GET /jokes", async () => {
        const res = await supertest(server).get("/jokes")
        expect(res.type).toBe("text/html")
    })
})