const supertest = require('supertest');
const server = require('./api/server');
const db = require('./database/dbConfig');

beforeEach(async () => {
    await db('users').truncate();
})

afterAll(async () => {
    await db.destroy()
})

describe('registration', () => {
    it('POST /users', async () => {
        const newUser = ({
            username: 'pbeesly',
            password: 'jim4ever'
        });
        const res = await supertest(server).post('/users').send(newUser)
        expect(res.statusCode).toBe(201)
    })
})