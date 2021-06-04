const Waste = require('../models/waste')
const Account = require('../models/account')
const Notification = require('../models/notification')

module.exports = {
    delivery(req, res, next) {
        Account.findById(req.body.account).exec()
            .then( acct => {
                let data = {
                    account: acct.id,
                    quantity: req.body.quantity,
                    type: req.body.type
                }
                if (req.body.date) {
                    data.date = new Date(req.body.date)
                }
                return new Waste(data).save()
            })
            .then(
                waste => {
                    new Notification({
                        account: waste.account,
                        date: waste.date,
                        message:`Delivered ${waste.quantity} Kg of ${waste.type}`
                    }).save()
                    res.status(201).json(waste)
                },
                err => next(err)
            )
    },
    query(req, res, next) {
        let q = null
        if (req.query.groupByType) {
            const pipeline = [
                {
                    $group: {
                        _id: "$type",
                        total: {$sum: "$quantity"}
                    }
                }, {
                    $project: {
                        _id: 0,
                        type: "$_id",
                        total: 1
                    }
                }
            ]
            if(req.query.includeDataPoints) {
                pipeline[0].$group.data = { $push:  { date: "$date", quantity: "$quantity" } }
                pipeline[1].$project.data = 1
            }
            let match = { }
            if (req.query.account) {
                match.account = req.query.account
            }
            if (req.query.from) {
                match.date = { $gte: new Date(req.query.from) }
            }
            if (req.query.to) {
                match.date = match.date || {}
                match.date.$lte = new Date(req.query.to)
            }
            if(Object.keys(match).length > 0) {
                pipeline.unshift({ $match: match })
            }
            q = Waste.aggregate(pipeline)
        } else {
            q = Waste.find()
            if (req.query.account) {
                q.where('account', req.query.account)
            }
            if (req.query.from) {
                q.where('date').gte(new Date(req.query.from))
            }
            if (req.query.to) {
                q.where('date').lte(new Date(req.query.to))
            }
        }
        q.then(
            result => res.status(200).json(result),
            err => next(err)
        )
    }
}