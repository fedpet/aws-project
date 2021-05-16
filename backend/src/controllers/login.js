const Account = require('../models/account')
const bcrypt = require('bcrypt')

module.exports = function(createToken) {
    return {
        login(req, res, next) {
            Account.findOne({email: req.body.email})
                .orFail(next)
                .then(acct => bcrypt.compare(req.body.password, acct.password).then(() => acct))
                .then(
                    acct => res.json({
                        email: acct.email,
                        token: createToken(acct)
                    }),
                    err => next(err)
                )
        },
        account(req, res, next) {
            Account.findOne({_id: req.auth.id}).orFail(next)
                .then(acct => res.json(acct), next)
        }
    }
}