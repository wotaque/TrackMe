const request = require('supertest')
const app = require('api/index.js')
const db = require('./config')

describe('auth endpoints' , () => {

    beforeAll(async () => {
        api = app.listen(5000, () => console.log('Test server running on port 5000'))
    });

    // afterAll(async () => {
    //     console.log('Gracefully stopping test server')
    //     await api.close()
    // })

    beforeAll(async () => await db.connect())
    afterEach(async () => await db.clearDatabase())
    afterAll(async () => await db.closeDatabase())

    it('registers new user', async()=>{
        const res = await request(api)
            .post('/register')
            .send({
                username: "meni",
                email: 'meni@test.com',
                password:'123123'
            })
        expect(res.statusCode).toBe(201)

        let authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWF0IjoxNjM5NTgyNTc2fQ.Rocg5YEBb0LeddFAi6FEXkZCbCabwu4dVn0QC-yUPtw"

        const res1 = await request(api)
            .get('/exists/meni')
            .set('Authorization','Bearer '+ authToken)
        
        expect(res1.statusCode).toBe(201)
    })

    it('logs in user', async ()=>{
        const res = await request(api)
            .post('/login')
            .send({
                email: 'test1@gmail.com',
                password: 'test'
            })
        expect(res.statusCode).toBe(200)
    })
} )

