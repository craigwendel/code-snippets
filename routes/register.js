const express = require('express')
const router = express.Router()

router.get('/login', function (req, res) {
  res.render('login')
})

router.post('/login', function (req, res) {

})

router.get('/signup', function (req, res) {
  res.render('signup')
})

module.exports = router
