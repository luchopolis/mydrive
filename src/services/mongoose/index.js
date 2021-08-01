const mongoose = require('mongoose')

const mongocon = mongoose.connection

mongocon.on('error',console.log.bind(console,'error en conectar'))

mongocon.once('open',() => {
    console.log(`Connected to mongo at ${mongocon.host}:${mongocon.port}`)
})


module.exports = mongoose