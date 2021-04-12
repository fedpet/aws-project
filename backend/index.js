const express = require('express')
const mongoose = require('mongoose');

const app = express()
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser:true, useUnifiedTopology:true})
mongoose.set('returnOriginal', false) // update queries will return the modified object instead of the original one

app.get('/', function(req, res) {
  res.send('Hello World')
})

app.listen(8080, function() {
  console.log('listening on http://localhost:8080')
})