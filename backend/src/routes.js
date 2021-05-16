const express = require('express')
const router = express.Router()
const { auth, guard, createToken } = require('./auth')

const account = require('./controllers/login')(createToken)

router.use(auth.unless({path: ['/login']}))

router.post('/login', account.login)
router.get('/account', account.account)

// handle all 404 requests
router.use(function (req,res){
    res.status(404).json({});
})

module.exports = router