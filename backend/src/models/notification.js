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
    message: {
        type: String,
        required: true
    },
    account: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
})

module.exports = mongoose.model('Notification', notificationSchema)