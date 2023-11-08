const request = require ('supertest');
const db = require ('../data/dbConfig');
const jokes_router = require('../api/jokes/jokes-router');
const auth_router = require('../api/auth/auth-router');



beforeAll( async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
})

describe( 'server.js' , () => {
  it('should set testing enviroment', () => {
    expect(process.env.NODE_ENV).toBe('testing')
  })
})

describe('[POST]/register', () => {
  it('response with a new created user', async() => {
    const response = await request(auth_router).post('/register').send({
      username:'Paul',password:'12345'
    })

    expect(response.status).toBe(200)
  })
})