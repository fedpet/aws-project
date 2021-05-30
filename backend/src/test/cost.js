const {app} = require('./base')
const Account = require('../models/account')
const Waste = require('../models/waste')
const { createToken } = require('../auth')
const request = require('supertest')
const expect = require('expect')

describe('Waste cost calculator', () => {
    let acct = null
    let token = null
    beforeEach(async () => {
        acct = await new Account({email:'test1', password:'test1', role:'user', name:'test'}).save()
        token = createToken(acct)
        await Waste.insertMany([
            { account: acct.id, type:'plastic', quantity:999, date: new Date('2021-05-31 23:59:59') },
            { account: acct.id, type:'plastic', quantity:5, date: new Date('2021-06-01') },
            { account: acct.id, type:'plastic', quantity:2, date: new Date('2021-06-02') },
            { account: acct.id, type:'paper', quantity:1, date: new Date('2021-06-03') },
            { account: acct.id, type:'paper', quantity:2, date: new Date('2021-06-04') },
            { account: acct.id, type:'glass', quantity:1, date: new Date('2021-06-04') },
            { account: acct.id, type:'glass', quantity:999, date: new Date('2021-07-01') }
        ])
    })
    it('should calculate monthly cost correctly', () =>
        request(app)
            .get('/account/' + acct.id + '/cost?month=6')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(res => {
                expect(res.body).toStrictEqual({
                    currency: 'EUR',
                    cost: 9.3,
                    details: [
                        { quantity: 1, type: 'glass', cost: 0.8 },
                        { quantity: 3, type: 'paper', cost: 1.5 },
                        { quantity: 7, type: 'plastic', cost: 7 }
                    ]
                })
            })
    )
})