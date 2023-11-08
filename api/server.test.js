const request = require ('supertest');
const db = require ('../data/dbConfig');
const jokes_router = require('../api/jokes/jokes-router')
const auth_router = require('../api/auth/auth-router')

// Write your tests here
describe( 'server.js' , () => {
  it('should set testing enviroment', () => {
    expect(process.env.NODE_ENV).toBe('testing')
  })
})
