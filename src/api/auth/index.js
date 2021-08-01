const { Router } = require('express')
const router = new Router()

const {authenticate} = require('../../services/passport')
const {sign} = require('../../services/jwt/index')


router.post('/login',authenticate,async (req,res,next) => {
    let token = await sign({
        user: req.user.view()
    })

    res.status(200).json({
        token: token,
        user: req.user.view(),
        a: req.isAuthenticated()
    })
})


module.exports = router