const request = require ('supertest');
const db = require ('../data/dbConfig');
// const jokes_router = require('./jokes/jokes-router');
// const auth_router = require('./auth/auth-router');
const server = require ('./server');


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
  it('response with a status code 200 and a newId ', async() => {
    const response = await request(server)
    .post('/api/auth/register')
    .send({username:'Paul', password:'12345'})

    expect(response.status).toBe(200)
    expect(response.body.id).toBe(1)
  })
})

describe('[POST]/login', () => {
  it('response with a status code 200 and a welcome message', async()=>{
    const response = await request(server)
    .post('/api/auth/login')
    .send({username:'Paul', password:'12345'})

    expect(response.status).toBe(200)
    expect(response.body.message).toEqual('welcome,Paul')
  })
})

describe('[GET]/',()=>{
  it('response with a error message and a status code 401', async()=>{
    const response = await request(server)
    .get('/api/jokes/')
    .send()

    expect(response.status).toBe(401)
    expect(response.body.message).toEqual('token required')
  })
})