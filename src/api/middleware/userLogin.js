module.exports = {
    isLoggin(req,res,next){
        if(req.isAuthenticated()){
            return next()
        }

        res.status(200).json({
            message: "Problema en autenticar"
        })
    }
}