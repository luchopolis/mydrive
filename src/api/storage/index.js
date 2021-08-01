const { Router } = require('express')
const { rootFolder,lookDirectory, createDirectory } = require('../../services/fileSystem/index')
 
const { inboundToken } = require('../middleware/verifyJWT')

const router = Router()

const {removeFile, removeDirectory} = require('./controller')

//To create a new path, user the username
router.get('/initPath',async (req,res,next) => {
    req.user = 'luisRootPath'
    if(await rootFolder('luisodd')){
        res.status(201).json({
            messsage: `the folder was created`
        })
    }else{
        res.json({
            messsage: "The folder exist"
        })
    }
})

router.get("/test",(req,res,next) => {
    res.status(200).json({
        msg: "Hola"
    })
})

router.get('/loadUserFolder', inboundToken, async (req,res,next) => {
    let { id,pathFolder } = req.user.user
    let content = await lookDirectory(pathFolder)
    res.status(200).json({
        folderData: content
    })
})

router.get('/loadDirectory', inboundToken, async (req,res,next) => {
    let { path } = req.body
    let { pathFolder } = req.user.user
    //let pathRoot = pathFolder+`/${path}` 

    let content = await lookDirectory(path)
    res.status(200).json({
        folderData: content
    })
})

router.post('/createDirectory', inboundToken, async (req, res, next) => {
    let { directoryName, path } = req.body
    
    let endPath = `${path}/${directoryName.replace(" ","-")}`

    try {
        if(await createDirectory(endPath)){
            res.status(201).json({
                message: "Created"
            })
        }else{
            res.status(201).json({
                message: "Folder exist"
            })
        }
    } catch (error) {
        console.log(error)
    }

})

router.delete('/removeFile',removeFile)
router.delete('/removeDirectory', removeDirectory)

module.exports = router