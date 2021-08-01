const { Router } = require('express')

const auth = require('./auth/index')
const storage = require('./storage/index')
const user = require('./user/index')
const uploads = require('./storage/uploads')

const { inboundToken } = require('./middleware/verifyJWT')
const { config } = require('../config')
const router = new Router()

router.use('/auth',auth)
router.use('/storage',storage)
router.use('/user',user)
router.use('/upload',inboundToken,uploads)



let initRoutes = (app) => {
    app.use('/',router)
    app.listen(config.port,config.ip,() => {
        console.log(`Running at ${config.ip}:${config.port} as ${config.env}`)
    })
}

module.exports = {initRoutes}
