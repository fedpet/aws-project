const {app} = require('./base')
const Account = require('../models/account')
const { createToken } = require('../auth')
const request = require('supertest')
const expect = require('expect')

describe("Account system", () => {
    const email = 'test@test.com'
    const pwd = 'password'
    const cryptedPwd = '$2b$04$089m3GJ8gb6.FBofLHlRGOqyPhuxVjRzT25Wa.2hW36gcPZsnVGDm'
    let token = undefined
    beforeEach(() =>
        new Account({email: email, password: cryptedPwd, role: 'admin'})
            .save()
            .then(acct => {
                token = createToken(acct)
                return acct
            })
    )
    describe("Login feature", () => {
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
    })
    describe("Account management", () => {
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
        it("creating users should require authentication", () =>
            request(app)
                .post('/account')
                .expect(401)
        )
        it("should not allow to create users with missing data", () =>
            request(app)
                .post('/account')
                .set('Authorization', `Bearer ${token}`)
                .send({})
                .expect(400)
        )
        it("should allow admins to create users", () =>
            request(app)
                .post('/account')
                .set('Authorization', `Bearer ${token}`)
                .send({ email: "newuser@gmail.com", role: "user", password: "testpassword"})
                .expect(201)
                .expect(res => {
                    expect(res.body).not.toHaveProperty('password')
                    expect(res.body).toMatchObject({
                        email: "newuser@gmail.com",
                        role: "user"
                    })
                })
        )
    })
})