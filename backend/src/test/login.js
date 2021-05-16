const {app} = require('./base')
const Account = require('../models/account')
const request = require('supertest')
const expect = require('expect')

describe("Auth system", () => {
    const email = 'test@test.com'
    const pwd = 'password'
    const cryptedPwd = '$2b$04$089m3GJ8gb6.FBofLHlRGOqyPhuxVjRzT25Wa.2hW36gcPZsnVGDm'
    beforeEach(() => new Account({email: email, password: cryptedPwd}).save())
    it("should not allow unknown accounts", function (done) {
        request(app)
            .post('/login')
            .send({email: "test", password: "ok"})
            .expect(404, done)
    })
    it("should allow to login", () =>
        request(app)
            .post('/login')
            .send({email: email, password: pwd})
            .expect(200)
            .expect(res => {
                expect(res.body).not.toHaveProperty('password')
                expect(res.body).toMatchObject({
                    email: email,
                    token: /.*/
                })
            })
    )
    it("should remember logged in user", async function () {
        const token = await request(app)
            .post('/login')
            .send({email: email, password: pwd})
            .then(res => res.body.token)
        return request(app)
            .get('/account')
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(res => {
                expect(res.body).not.toHaveProperty('password')
                expect(res.body).toMatchObject({
                    email: email
                })
            })
    })
    it("should not allow fake tokens", () =>
        request(app)
            .get('/account')
            .set('Authorization', 'Bearer ahadbawodkawdmaodpadmands')
            .expect(401)
    )
    it("should not authenticate without token", () =>
        request(app)
            .get('/account')
            .expect(401)
    )
})