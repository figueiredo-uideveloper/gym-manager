const express = require('express')
const routes = express.Router()
const instructors = require("./instructors/instructors")

routes.get('/', function (req, res) {
    res.redirect('/instructors')
})

routes.get('/instructors', instructors.index)

routes.get('/members', function (req, res) {
    res.render('members')
})

routes.get('/instructor/create', function (req, res) {
    res.render('instructors/create')
})

routes.get('/instructor/view/:id', instructors.view)

routes.get('/instructor/:id/edit', instructors.edit)

routes.post("/instructors", instructors.post)

module.exports = routes