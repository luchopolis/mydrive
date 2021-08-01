const {verify} = require('../../services/jwt/index')
const { config } = require('../../config')

module.exports = {
    async inboundToken(req,res,next){
        let token = req.headers["authorization"]

        !token ? res.status(401).json({ message: "No token was provided" }) : null

        let tokenExtracted = token.split(' ')[1]

        try {
            let decoded = await verify(tokenExtracted,config.jwtSecret)
            
            req.user = decoded
            
            next()
        } catch (error) {
            if (error) {
                res.json({
                    message: "Token invalido"
                })
            }
        }
    }
}