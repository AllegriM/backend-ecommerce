const express = require('express')
const errorMiddleware = require('./middlewares/error.middleware')
const apiRoutes = require('./routes/app.routers')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api', apiRoutes)

app.use(errorMiddleware)

module.exports = app;

