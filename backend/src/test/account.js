const {app} = require('./base')
const Account = require('../models/account')
const { createToken } = require('../auth')
const request = require('supertest')
const expect = require('expect')

describe("Account system", () => {
    const email = 'test@test.com'
    const pwd = 'password'
    const cryptedPwd = '$2b$04$089m3GJ8gb6.FBofLHlRGOqyPhuxVjRzT25Wa.2hW36gcPZsnVGDm'
    let id = undefined
    let token = undefined
    beforeEach(() =>
        new Account({email: email, password: cryptedPwd, role: 'admin', name:'Name'})
            .save()
            .then(acct => {
                id = acct.id
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
                        id: id,
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
                .get('/me')
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
                .get('/me')
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
                .send({ email: "newuser@gmail.com", role: "user", password: "testpassword", name: "test"})
                .expect(201)
                .expect(res => {
                    expect(res.body).not.toHaveProperty('password')
                    expect(res.body).toMatchObject({
                        email: "newuser@gmail.com",
                        role: "user"
                    })
                })
        )
        it("should allow admins to list all users", () =>
            request(app)
                .get('/account')
                .set('Authorization', `Bearer ${token}`)
                .expect(200)
                .expect(res => {
                    expect(res.body).toHaveLength(1)
                    expect(res.body).toMatchObject([{
                        email: email,
                        role: 'admin'
                    }])
                })
        )
        it("should allow admins to update users", async function() {
            const account = await new Account({email: 'target@target.com', password: cryptedPwd, role: 'user', name: 'test'}).save()
            const newEmail = 'bla@bla.bla'
            return request(app)
                .patch('/account/' + account.id)
                .send({email: newEmail})
                .set('Authorization', `Bearer ${token}`)
                .expect(200)
                .expect(res => {
                    expect(res.body).toMatchObject({
                        email: newEmail,
                        role: 'user',
                        name: 'test'
                    })
                })
        })
        it("should allow admins to change passwords", async function() {
            const account = await new Account({email: 'target@target.com', password: cryptedPwd, role: 'user', name: 'test'}).save()
            const newPwd = 'newPwd'
            await request(app)
                .patch('/account/' + account.id)
                .send({password: newPwd})
                .set('Authorization', `Bearer ${token}`)
                .expect(200)
            return request(app)
                .post('/login')
                .send({email: 'target@target.com', password: newPwd})
                .expect(200)
        })
        it("should allow admins to delete accounts", async function() {
            const account = await new Account({email: 'target@target.com', password: cryptedPwd, role: 'user', name: 'test'}).save()
            await request(app)
                .delete('/account/' + account.id)
                .set('Authorization', `Bearer ${token}`)
                .expect(204)
            return request(app)
                .get('/account')
                .set('Authorization', `Bearer ${token}`)
                .expect(200)
                .expect(res => {
                    expect(res.body.map(r => r.id)).not.toContain(account.id)
                })
        })
    })
})