const Notification = require('../models/notification')

module.exports = {
    query(req, res, next) {
        let q = Notification.find({account: req.auth.id})
        if (req.query.from) {
            q.where('date').gte(new Date(req.query.from))
        }
        if (req.query.to) {
            q.where('date').lte(new Date(req.query.to))
        }
        q.sort({date:'descending'})
        q.exec().then(notifications => res.status(200).json(notifications), next)
    },
    markAsRead(req, res, next) {
        Notification.findByIdAndUpdate(req.params.notification, req.body, {new:true})
            .then(n => res.json(n), next)
    }
}

/*
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

//Handle mark notification as read
exports.markAsRead = function(req, res) {
    Notification.findById(req.params.notification_id, function(err, notification) {
        if (err) {
            res.status(500).json(err);
        }
        notification.read = true;
        notification.save(function(err) {
            if (err) {
                res.status(500).json(err);
            }
        });
    })
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
 */