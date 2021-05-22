const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const app = require('../../index')

module.exports = {
    app: app,
    mochaHooks: {
        beforeEach(done) {
            const db = new MongoMemoryServer()
            db.getUri()
                .then(uri => mongoose.connect(uri, {
                    useNewUrlParser:true,
                    useUnifiedTopology:true,
                    useCreateIndex: true,
                    returnOriginal: false
                }))
                .finally(done)
        },
        afterEach(done) {
            mongoose.disconnect().finally(done)
        }
    }
}