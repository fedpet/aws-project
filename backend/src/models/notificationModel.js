const mongoose = require('mongoose')
const { Schema } = mongoose

const notificationSchema = new Schema({
    read: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    },
    type: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    user:  Schema.Types.ObjectId
});

var Notification = module.exports = mongoose.model('Notification', notificationSchema)

module.exports.get = function(callback, limit) {
    Notification.find(callback).limit(limit);
}