const express = require('express')
const routes = express.Router()
const instructors = require("./instructors/instructors")

routes.get('/', function (req, res) {
    res.redirect('/instructors')
})

routes.get('/instructors', function (req, res) {
    res.render('instructors')
})

routes.get('/members', function (req, res) {
    res.render('members')
})

routes.get('/instructor/create', function (req, res) {
    res.render('registerLayout')
})

routes.get('/instructor/view/:id', instructors.view)

routes.post("/instructors", instructors.post)

module.exports = routes