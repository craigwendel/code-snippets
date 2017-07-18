const express = require('express')
const mustache = require('mustache-express')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')
const session = require('express-session')
const authentication = require('./middleware/authenticate')
const homepageRoutes = require('./routes/homepage')
const registrationRoutes = require('./routes/register')

app.engine('mustache', mustache())
app.set('view engine', 'mustache')
app.set('layout', 'layout')
mongoose.Promise = require('bluebird')
mongoose.connect('mongodb://localhost:27017/code-snippets-test')

app.use(session({
  secret: 'so pumped for this',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
}))

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(registrationRoutes)
app.use(authentication)
app.use(homepageRoutes)

app.listen(3000, function () {
  console.log('Code-snippets launched!')
})
