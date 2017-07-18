const express = require('express')
const mustache = require('mustache-express')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')
const homepageRoutes = require('./routes/homepage.js')

app.engine('mustache', mustache())
app.set('view engine', 'mustache')
app.set('layout', 'layout')
mongoose.Promise = require('bluebird')
mongoose.connect('mongodb://localhost:27017/code-snippets-test')

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(homepageRoutes)

app.listen(3000, function () {
  console.log('Code-snippets launched!')
})
