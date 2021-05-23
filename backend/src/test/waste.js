const {app} = require('./base')
const Account = require('../models/account')
const Waste = require('../models/waste')
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

describe('Waste querying system', () => {
    let a1 = null
    let a2 = null
    beforeEach(async () => {
        a1 = await new Account({email:'test1', password:'test1', role:'user'}).save()
        a2 = await new Account({email:'test2', password:'test2', role:'user'}).save()
        await Waste.insertMany([
            { account: a1.id, type:'plastic', quantity:5, date: new Date('2021-06-01') },
            { account: a2.id, type:'plastic', quantity:2, date: new Date('2021-06-02') },
            { account: a1.id, type:'paper', quantity:1, date: new Date('2021-06-03') },
            { account: a2.id, type:'paper', quantity:2, date: new Date('2021-06-04') }
        ])

    })
    it('should allow grouping', () =>
        request(app)
            .get('/waste?groupByType=true')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(res => {
                expect(res.body).toStrictEqual([
                    { type: 'paper', total: 3, percentage: 0.3 },
                    { type: 'plastic', total: 7, percentage: 0.7 }
                ])
            })
    )
    it('should work with a specific account', () =>
        request(app)
            .get('/waste?account=' + a2.id)
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(res => {
                expect(res.body).toMatchObject([
                    { account: a2.id, type:'plastic', quantity:2, date: new Date('2021-06-02').toISOString() },
                    { account: a2.id, type:'paper', quantity:2, date: new Date('2021-06-04').toISOString() }
                ])
            })
    )
    it('should allow filtering by date', () =>
        request(app)
            .get('/waste?from=2021-06-02&to=2021-06-03')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(res => {
                expect(res.body).toMatchObject([
                    { account: a2.id, type:'plastic', quantity:2, date: new Date('2021-06-02').toISOString() },
                    { account: a1.id, type:'paper', quantity:1, date: new Date('2021-06-03').toISOString() },
                ])
            })
    )
})