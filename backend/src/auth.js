const JWT_SECRET = '12345' // just for demonstration
const REQUEST_PROPERTY_DECODED_JWT = 'auth' // decoded JWT token gets inserted in request.auth

const jwt = require('jsonwebtoken')
// JWT decoding middleware
const auth = require('express-jwt')({ // JWT decoding middleware
    secret: JWT_SECRET,
    algorithms: ['HS256'],
    credentialsRequired: true,
    requestProperty: REQUEST_PROPERTY_DECODED_JWT
})
const guard = require('express-jwt-permissions')({
    requestProperty: REQUEST_PROPERTY_DECODED_JWT,
    permissionsProperty: 'role' // permissions are stored in the role field of the JWT token
})

module.exports = {
    auth: auth,
    guard: guard,
    createToken(account) {
        return jwt.sign({id: account._id, role:account.role}, JWT_SECRET)
    }
}