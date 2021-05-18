const Notification = require('../models/notificationModel')

//Handle get all notification
exports.getNotifications = function(req, res) {
    Notification.find({ user: req.params.user }, function(err, notifications) {
        if (err) {
            res.status(500).json(err);
        }
        res.status(200).json({
            data: notifications
        });
    });
}

//Handle view get notification by id
exports.getNotificationById = function(req, res) {
    Notification.findById(req.params.notification_id, function(err, notification) {
        if (err) {
            res.status(500).json(err);
        }
        res.status(200).json({
            data: notification
        });
    });
}

//Handle create new notification
exports.createNotification = function(req, res) {
    var nt = new Notification();
    nt.type = req.body.type;
    nt.quantity = req.body.type;
    nt.user = req.body.user;

    nt.save(function(err) {
        if (err) {
            res.status(500).json(error);
        }
        res.status(201).json({
            data: notification
        });
    });
}

//Handle mark notification as read
exports.markAsRead = function(req, res) {
    Notification.findById(req.params.notification_id, function(err, notification) {
        if (err) {
            res.status(500).json(err);
        }
        notification.status = true;
        notification.save(function(err) {
            if (err) {
                res.status(500).json(err);
            }
            res.status(200).json({
                data: notification
            });
        });
    });
}

//Handle get notifications between two dates
exports.getNotificationByDate = function(req, res) {
    let start = moment(new Date(req.params.start_date));
    let end = moment(new Date(req.params.end_date));

    let query = { user: req.params.user, date: { '$gte': start, '$lte': end } };
    Notification.find(query, function(err, notification) {
        if (err) {
            res.status(500).json(err);
        }
        res.status(200).json({
            data: notification
        })
    });
}