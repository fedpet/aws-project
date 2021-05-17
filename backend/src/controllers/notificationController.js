const Notification = require('../models/notificationModel')

//Handle get all notification
exports.getNotifications = function(req, res) {
    Notification.find({ user: req.params.user }, function(err, notifications) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            })
        }
        res.json({
            status: "Success",
            message: "Notification retrived successfully",
            data: notifications
        });
    });
}

//Handle view get notification by id
exports.getNotificationById = function(req, res) {
    Notification.findById(req.params.notification_id, function(err, notification) {
        if (err) {
            res.send(err);
        }
        res.json({
            data: notification
        });
    });
}

//Handle create new notification
exports.createNotification = function(req, res) {
    var nt = new notification();
    nt.type = req.body.type;
    nt.quantity = req.body.type;
    nt.user = req.body.user;

    nt.save(function(err) {
        if (err) {
            res.json(error);
        }
        res.json({
            message: "New notification createx",
            data: notification
        });
    });
}

//Handle mark notification as read
exports.markAsRead = function(req, res) {
    Notification.findById(req.params.notification_id, function(err, notification) {
        if (err) {
            res.send(err);
        }
        notification.status = true;
        notification.save(function(err) {
            if (err) {
                res.json(err);
            }
            res.json({
                message: 'Motification mark as read',
                data: notification
            });
        });
    });
}

//Handle get notifications beetween two dates
exports.getNotificationByDate = function(req, res) {
    let start = moment(new Date(req.params.start_date));
    let end = moment(new Date(req.params.end_date));

    let query = { user: req.params.user, date: { '$gte': start, '$lte': end } };
    Notification.find(query, function(err, notification) {
        if (err) {
            res.send(err);
        }
        res.json({
            data: notification
        })
    });
}