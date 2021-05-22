const {app} = require('./base')
const Account = require('../models/account')
const request = require('supertest')
const expect = require('expect')

describe('Waste delivery system', () => {
    it('should allow delivery for existing accounts', async function () {
        const acct = await new Account({email: 'test', password: 'test'}).save()
        return request(app)
            .post('/waste')
            .send({
                account: acct.id,
                quantity: 10,
                type: 'plastic'
            })
            .expect(201)
            .expect('Content-Type', /json/)
            .expect(res => {
                expect(res.body).toMatchObject({
                    account: acct.id,
                    quantity: 10,
                    type: 'plastic'
                })
            })
    })
    it('should not allow delivery for unknown accounts', () =>
        request(app)
            .post('/waste')
            .send({
                account: 'unknown',
                quantity: 10,
                type: 'plastic'
            })
            .expect(400)
    )
})