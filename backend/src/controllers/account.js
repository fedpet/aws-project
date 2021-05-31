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
        loggedIn(req, res, next) {
            Account.findOne({_id: req.auth.id}).orFail(next)
                .then(acct => res.json(acct), next)
        },
        list(req, res, next) {
            Account.find().then(list => res.json(list), next)
        },
        update(req, res, next) {
            Account.findOneAndUpdate({ _id: req.params.account }, req.body, { new: true })
                .then(acct => res.json(acct), next)
        },
        create(req, res, next) {
            new Account(req.body).save().then(acct => res.status(201).json(acct), next)
        },
        delete(req, res, next) {
            Account.deleteOne({ _id: req.params.account }).then(r => res.status(204).send(), next)
        }
    }
}