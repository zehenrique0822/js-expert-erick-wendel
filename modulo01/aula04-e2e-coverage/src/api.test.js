const { describe, it, before, after } = require('mocha')
const supertest = require('supertest')
const assert = require('assert')
let app
describe('API Suite test', () => {
  before((done) => {
    app = require('./api')
    app.once('listening', done)
  })

  after((done) => {
    app.close(done)
  })
  
  describe('/contact:get', () => {
    it('Should request the contact route and return HTTP status 200', async () => {
      const response = await supertest(app)
      .get('/contact')
      .expect(200)

      assert.strictEqual(response.text, 'contact us page')
    })
  })

  describe('/login:post', () => {
    it('Should request the contact page and return HTTP status 200', async () => {
      const response = await supertest(app)
      .post('/login')
      .send({
        username: 'JoseHenrique',
        password: '123'
      })
      .expect(200)

      assert.strictEqual(response.text, 'Log in sucessed')
    })

    it('Should request the contact page and return HTTP status 200', async () => {
      const response = await supertest(app)
      .post('/login')
      .send({
        username: 'xuxa da silva',
        password: '123'
      })
      .expect(401)
      
      assert.ok(response.unauthorized)
      assert.strictEqual(response.text, 'Log in failed!')
    })
  })

  describe('/hi:get - 404', () => {
    it('Should request and existing page and return HTTP status 404', async () => {
      const response = await supertest(app)
      .get('/hi')
      .expect(404)

      assert.strictEqual(response.text, 'not found')
    })
  })
})