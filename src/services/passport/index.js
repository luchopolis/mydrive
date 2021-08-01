const passport = require('passport')
const { BasicStrategy } = require('passport-http')

const User = require('../../api/user/model')

//middlewares

const authenticate = (req,res,next) =>
    passport.authenticate('simple-login',{ session: false }, (err, user, info) => {
        if (err) { 
            res.status(400).json(err)
        }
        if (!user) {
            res.status(400).end()
        }
        req.logIn(user, {session : false},(err) => {
            if ( err ) { return res.status(401).end() }
            next()
        })
    })(req,res,next)

//Strategies block

passport.use('simple-login',new BasicStrategy(async (user,password,done) => {
    User.findOne({ username: user }, async (err, user) => {
        
        if (err) { return done(err) }
        if(!user) { return done(null, false) }
        let check = await user.matchPassword(password)
        if(!check) { return done(null, false) }
        return done(null,user) 
    })

}))

passport.serializeUser((user,done) => {
    done(null,user)
})

module.exports = {authenticate}