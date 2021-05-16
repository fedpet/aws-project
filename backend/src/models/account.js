const mongoose = require('mongoose')
const { Schema } = mongoose

const accountSchema = new Schema({
    email: {
        type: String,
        unique: true
    },
    password: String,
    role: String
})

accountSchema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.password;
    delete obj._id;
    delete obj.__v;
    return obj;
}

module.exports = mongoose.model('Account', accountSchema)