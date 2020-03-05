const express = require('express')
const nunjunks = require('nunjucks')
const routes = require('./router')

const app = express()

app.use(express.static('public'))
app.use(routes)

app.set('view engine', 'njk')

nunjunks.configure('src/views', {
    express: app,
    autoescape: false,
    noCache: true
})


app.listen(8001)