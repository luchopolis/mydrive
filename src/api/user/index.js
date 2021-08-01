const { Router } = require('express')
const router = new Router()
const {create} = require('../user/controller')

const {isLoggin} = require('../middleware/userLogin')
const { inboundToken } = require('../middleware/verifyJWT')

const {findUser,profile} = require('../user/controller')

router.post('/', create)

router.get('/me',inboundToken,profile)

module.exports = router