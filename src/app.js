const express = require('express')
const {initRoutes} = require('./api/index')
const { config } = require('./config')

const mongoose = require('./services/mongoose')
const app = express()

app.use(express.json())

mongoose.connect(config.mongo.uri,
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    })

initRoutes(app)
