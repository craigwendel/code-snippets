const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.get('/login', function (req, res) {
  res.render('login')
})

router.post('/login', function (req, res) {
  User.findOne({
    username: req.body.username,
    password: req.body.password
  }).then(function (user, error) {
    if (user) {
      req.session.userId = user._id
      res.redirect('/')
    } else {
      res.render('login', {
        user: user,
        error: error
      })
    }
  })
})

router.get('/signup', function (req, res) {
  res.render('signup')
})

router.post('/signup', function (req, res) {
  const user = new User()
  user.fullname = req.body.fullname
  user.username = req.body.username
  user.password = req.body.password
  user.email = req.body.email
  user.save()
  .then(function (user) {
    req.session.userId = user._id
    res.redirect('/')
  })
  .catch(function (error) {
    res.render('signup', {
      user: user,
      error: error
    })
  })
})

router.post('/logout', function (req, res) {
  req.session.destroy(function () {
    res.redirect('/login')
  })
})

module.exports = router
