const jwt = require('jsonwebtoken')
const util = require('util')

const {config} = require('../../config')

let jwtsign = util.promisify(jwt.sign)
let jwtverify = util.promisify(jwt.verify)

let sign = (payload) => jwtsign(payload,config.jwtSecret)

let verify = (token) => jwtverify(token,config.jwtSecret)

module.exports = {sign,verify}
