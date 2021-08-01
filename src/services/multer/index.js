let multer = require('multer')
const { config } = require('../../config')

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        let { path } = req.query
        cb(null, `${config.localDrivePath}/${path}`)
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, fileName)
    }
})

const upload = multer({
    storage: storage
});

const uploadFilter = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/gif") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Allowed only .png, .jpg, .jpeg and .gif'));
        }
    }
});

initMulter = upload

module.exports = {initMulter,storage,uploadFilter}