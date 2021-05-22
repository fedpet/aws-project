const express = require('express')
const routes = require('./src/routes')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())
app.use(routes)

const PORT = process.env.PORT || 3001

process.on('unhandledRejection', (error) => {
  console.log('unhandledRejection')
  console.log(error)
})

if (process.env.DB_CONNECTION) {
  mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex: true,
    returnOriginal: false // update queries will return the modified object instead of the original one
  }).catch(err => {
    console.log(err)
    process.abort()
  })
}

app.listen(PORT,() => {
  console.log('listening on http://localhost:' + PORT)
})

module.exports = app