const { remove, removeDirectory } = require('../../services/fileSystem/index')


module.exports = {
    async removeFile(req, res, next) {
        let { path } = req.body
        if(await remove(path)){
            res.status(200).json({
                path: path,
                msg: "The file was removed"
            })
        }else{
            res.status(400).json({
                msg: "There was an error"
            })
        }
    },
    async removeDirectory (req,res, next) {
        let { path } = req.body
        let recursive = true //
        let removeOperation = await removeDirectory(recursive, path)
        if(removeOperation === true){
            res.status(200).json({
                path: path,
                msg: "The directory was removed"
            })
        }else{
            res.status(400).json({...removeOperation })
        }
    }
}
