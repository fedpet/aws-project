const express = require('express')
const router = express.Router()

const account = require('./controllers/login')

router.post('/login', account.login)

module.exports = router