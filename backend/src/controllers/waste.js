const Waste = require('../models/waste')
const Account = require('../models/account')

module.exports = {
    delivery(req, res, next) {
        Account.findById(req.body.account).exec()
            .then(
                acct => new Waste({
                    account: acct.id,
                    quantity: req.body.quantity,
                    type: req.body.type
                }).save()
            )
            .then(
                doc => res.status(201).json(doc),
                err => next(err)
            )
    }
}