const express = require('express')
const router = express.Router()
const { auth, guard, createToken } = require('./auth')

const account = require('./controllers/login')(createToken)
const notification = require('../controllers/notificationController');

router.use(auth.unless({ path: ['/login'] }))

router.post('/login', account.login)
router.get('/account', account.account)

//Notifications system
router.route('/user/:user/notifications')
    .get(notification.getNotifications)
    .post(notification.createNotification);

router.route('/user/:user/notifications/:notification_id')
    .get(notification.getNotificationById)
    .post(notification.markAsRead);

router.get('/user/:user/notifications/:start_date/:end_date');

// handle all 404 requests
router.use(function(req, res) {
    res.status(404).json({});
})

module.exports = router
module.exports = router