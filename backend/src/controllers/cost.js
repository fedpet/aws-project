const Waste = require('../models/waste')
const Account = require('../models/account')
const moment = require('moment')

const TYPE_TO_PRICE = new Map([
    ['paper', 0.5],
    ['plastic', 1],
    ['glass', 0.8]
])
const DEFAULT_PRICE = 1.0
const CURRENCY = 'EUR'

module.exports = {
    async calculate(req, res, next) {
        if (req.auth.id !== req.params.account && req.auth.role !== 'admin') {
            res.status(401)
            return;
        }
        const dateFrom = moment()
            .year(req.query.year)
            .month(req.query.month-1)
            .startOf('month')
        const dateTo = dateFrom.clone().endOf('month')
        Account.findById(req.params.account).exec()
            .then(acct => Waste.aggregate([
                    {
                        $match: {
                            account: acct._id,
                            date: { $gte:dateFrom.toDate(), $lte:dateTo.toDate() }
                        }
                    }, {
                        $group: {
                            _id: "$type",
                            quantity: { $sum: "$quantity" }
                        }
                    }, {
                        $project: {
                            _id: 0,
                            type: "$_id",
                            quantity: 1
                        }
                    }]).exec()
            ).then(result => result.map(record => {
                const price = TYPE_TO_PRICE.get(record.type) || DEFAULT_PRICE
                record.cost = record.quantity * price
                return record
            })).then(result => {
                return {
                    currency: CURRENCY,
                    cost: result.reduce((a,b) => a + b.cost, 0),
                    details: result
                }
            }).then(
                doc => res.status(200).json(doc),
                err => next(err)
            )
    }
}