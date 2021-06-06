const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { Schema } = mongoose

const accountSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    name: {
        type: String,
        required: true
    }
})

accountSchema.pre('save', function(next) {
    if (!this.isModified('password')) {
        return next()
    }
    bcrypt.genSalt(2, (error, salt) => {
        if (error) {
            return next(error)
        }
        bcrypt.hash(this.password, salt, (error, hash) => {
            if (error) {
                return next(error)
            }
            this.password = hash
            next()
        })
    })
})

accountSchema.methods.toJSON = function() {
    var obj = this.toObject()
    delete obj.password
    obj.id = obj._id
    delete obj._id
    delete obj.__v
    return obj
}

module.exports = mongoose.model('Account', accountSchema)