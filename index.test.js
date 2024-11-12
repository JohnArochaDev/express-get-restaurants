const request = require('supertest')
const app = require('./src/app')
const db = require('./db/connection')

describe('Restaurant API', () => {
    beforeAll(async () => {
        await db.sync()
    })

    afterAll(async () => {
        await db.close();
    })

    test('should create a new restaurant', async () => {
        const response = await request(app)
            .post('/restaurants')
            .send({
                name: 'Test Restaurant',
                address: '123 Test St',
                cuisine: 'Test Cuisine'
            })
        expect(response.status).toBe(201);
        expect(response.body.name).toBe('Test Restaurant')
    })

    // Add more test cases as needed
})