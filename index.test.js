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

    test('Should return all restaurants', async () => {
        const response = await request(app)
            .get('/restaurants')
        expect(response.status).toBe(200)
        expect(Array.isArray(response.body)).toBe(true)
        expect(response.body.length).toBe(2)
    })

    test('Should return all restaurants', async () => {
        const response = await request(app)
            .get('/restaurants/2')
        expect(response.status).toBe(200)
        expect(response.body.name).toEqual('LittleSheepppp')
    })

    test('should create a new restaurant', async () => {
        const response = await request(app)
            .post('/restaurants')
            .send({
                name: 'Test Restaurant',
                address: '123 Test St',
                cuisine: 'Test Cuisine'
            })
        expect(response.status).toBe(201)
        expect(response.body.name).toBe('Test Restaurant')
    })

    test('Should delete all test restaurant', async () => {
        const response = await request(app)
            .delete('/restaurants/all')
        expect(response.status).toBe(204)
    })

    test('Should return all restaurants', async () => {
        const response = await request(app)
            .put('/restaurants/3')
            .send({
                "id": 3,
                "name": "Spice Grill Test",
                "location": "Houston",
                "cuisine": "Indian",
                "createdAt": "2024-11-08T15:12:17.622Z",
                "updatedAt": "2024-11-08T15:12:17.622Z"
            })
        expect(response.status).toBe(200)
        expect(response.body.name).toEqual('Spice Grill Test')
    })

    // Add more test cases as needed
})