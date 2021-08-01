require('dotenv').config()
const path = require('path')

module.exports = {
    config: {
        env: process.env.NODE_PRO || 'development',
        port: process.env.PORT || 3000,
        ip: process.env.IP || 'localhost',
        mongo: {
            uri: process.env.MONGO || 'mongodb://localhost/udrive'
        },
        jwtSecret: process.env.JWTSECRET,
        localDrivePath:path.join(path.dirname(__dirname), 'src/localDrive')
    }
}