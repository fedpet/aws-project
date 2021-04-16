const express = require('express')
const mongoose = require('mongoose');

const app = express()
app.use(express.json())

const PORT = process.env.APP_PORT || 8080

mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser:true, useUnifiedTopology:true})
mongoose.set('returnOriginal', false) // update queries will return the modified object instead of the original one

app.get('/', function(req, res) {
  res.send('Hello World')
})

app.listen(PORT, function() {
  console.log('listening on http://localhost:' + PORT)
})