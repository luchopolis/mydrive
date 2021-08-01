const { Router } = require('express')
const router = Router()
const {initMulter} = require('../../services/multer/index')



router.post('/file',initMulter.single('prueba'),async (req, res, next) => {
    
    let { filename } = req.file
    res.status(200).json({
        message: "Archivo subido",
        fileName: filename
    })
})

router.post('/files',(req, res, next) => {

})

module.exports = router