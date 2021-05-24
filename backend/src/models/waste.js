const mongoose = require('mongoose')
const { Schema } = mongoose

const schema = new Schema({
    account: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
    type: { type: String, required: true },
    quantity: { type: Number, required: true },
    date: { type: Date, default: Date.now, required: true, index: true }
})
schema.index({account: 1, date: -1}) // ascending accounts, descending dates

module.exports = mongoose.model('Waste', schema, 'waste')