const express = require('express')
const router = express.Router()
const { auth, guard, createToken } = require('./auth')
const { CastError } = require('mongoose')

const account = require('./controllers/login')(createToken)
const notification = require('./controllers/notificationController');


router.use(auth.unless({ path: ['/login'] }))

const waste = require('./controllers/waste')

router.use( auth.unless({ path: ['/login', '/waste'] }))

const notification = require('../controllers/notificationController');

router.use(auth.unless({ path: ['/login'] }))


router.post('/login', account.login)
router.get('/account', account.account)
router.post('/waste', waste.delivery)


router.use((err, req, res, next) => {
    if(err instanceof CastError) {
        res.status(400).json(err.stack)
    } else {
        next(err)
    }
})

//Notifications system
router.route('/account/:account/notifications')
    .get(notification.getNotifications)

router.route('/account/:account/notifications/:notification_id')
    .get(notification.getNotificationById)
    .post(notification.markAsRead);

router.get('/account/:account/notifications/:start_data/:end_data');


// handle all 404 requests
router.use(function(req, res) {
    res.status(404).json({});
})

module.exports = router