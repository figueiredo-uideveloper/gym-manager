const express = require('express')
const nunjunks = require('nunjucks')
const routes = require('./router')

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(routes)

app.set('view engine', 'njk')

nunjunks.configure('src/views', {
    express: app,
    autoescape: false,
    noCache: true
})

app.use(function (req, res) {
    res.status(404).render("404");
})
app.listen(8000)