const express = require('express')
const router = express.Router()
const { auth, guard, createToken } = require('./auth')
const { CastError } = require('mongoose')

const account = require('./controllers/account')(createToken)
const notification = require('./controllers/notificationController')
const waste = require('./controllers/waste')
const cost = require('./controllers/cost')

router.use( auth.unless({ path: ['/login', '/waste'] }))

router.post('/login', account.login)
router.get('/me', account.loggedInAccount)
router.get('/account', account.listAccounts)
router.post('/account', guard.check('admin'), account.createAccount)
router.post('/waste', waste.delivery)
router.get('/waste', waste.query)
router.get('/account/:account/cost', cost.calculate)
router.get('/account/:account/notifications', notification.getNotifications)
router.get('/account/:account/notifications/:start_data/:end_data')
router.route('/account/:account/notifications/:notification_id')
    .get(notification.getNotificationById)
    .post(notification.markAsRead)

router.use((err, req, res, next) => {
    if(err instanceof CastError || err.name === 'ValidationError') {
        res.status(400).json(err.stack)
    } else {
        next(err)
    }
})

// handle all 404 requests
router.use(function(req, res) {
    res.status(404).json({});
})

module.exports = router