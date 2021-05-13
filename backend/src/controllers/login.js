const Account = require('../models/account')
const bcrypt = require('bcrypt')

module.exports = {
    async login(req, res) {
        console.log(req.body)
        // TODO: use bcrypt.compare instead of querying for password directly
        const acc = await bcrypt.hash(req.body.password, 15)
                .then(pwd => Account.findOne({ email: req.body.email, password: pwd}).exec())
        res.json(acc)
    }
}