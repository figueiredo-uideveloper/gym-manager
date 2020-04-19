const express = require('express')
const routes = express.Router()

routes.get('/', function (req, res) {
    res.redirect('/instructors')
})

routes.get('/instructors', function (req, res) {
    res.render('instructors')
})

routes.get('/members', function (req, res) {
    res.render('members')
})

routes.get('/register', function (req, res) {
    res.render('register')
})

module.exports = routes