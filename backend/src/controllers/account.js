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
                        role: acct.role,
                        token: createToken(acct)
                    }),
                    err => next(err)
                )
        },
        loggedInAccount(req, res, next) {
            Account.findOne({_id: req.auth.id}).orFail(next)
                .then(acct => res.json(acct), next)
        },
        listAccounts(req, res, next) {
            Account.find().then(list => res.json(list), next)
        },
        createAccount(req, res, next) {
            new Account(req.body).save().then(acct => res.status(201).json(acct), next)
        }
    }
}