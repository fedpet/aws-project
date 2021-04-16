const express = require('express')
const mongoose = require('mongoose');

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 3001

process.on('unhandledRejection', (error) => {
  console.log('unhandledRejection')
  console.log(error)
})

mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser:true, useUnifiedTopology:true})
mongoose.set('returnOriginal', false) // update queries will return the modified object instead of the original one

const ExampleModel = mongoose.model('ExampleModel', {
    id: { type: Number },
    title: { type: String }
});
ExampleModel.insertMany([
  {id:1, title:'First'},
  {id:2, title:'Second'},
  {id:3, title:'Third'},
  {id:4, title:'Fourth'}
])

app.get('/', (req, res) => {
  res.send('Hello World')
})
app.get('/example', (req, res) => {
  ExampleModel.find().then(models => {
    res.json(models)
  })
})

app.listen(PORT,() => {
  console.log('listening on http://localhost:' + PORT)
})