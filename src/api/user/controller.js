const User = require('../user/model')

const { rootFolder } = require('../../services/fileSystem')

const { sign } = require('../../services/jwt/index')

const findUser = (req,res,next) => {
    let { username } = req.body
    
    User.find({ username: username })
        .then((user) => user)
        .then((data) => {
            res.status(200).json({
                data
            })
        })
        .catch(next)
}

const profile = (req,res,next) => {
    let { username } = req.user.user

    User.findOne({ username: username })
    .then((user) => user)
    .then((data) => {
        res.status(200).json({
            info: data.view()
        })
    })
    .catch(next)
}
const create = (req,res,next) => {
    let { username, password, email, rol, image } = req.body
    let usernew = new User({ username, password, email, rol, image })

    User.find({ $or: [{ username: username }, { email: email }] }, (err, user) => {
        if (err) {
            res.status(500).json({
                message: 'internal server error'
            })
        }
        if (user.length === 0) {
            usernew.save(async function (err, user) {
                if (err) return console.error(err);
                
                if (await rootFolder(user.pathFolder)) {
                    
                    let token = await sign(user.toJSON())

                    res.status(201).json({
                        token: token,
                        data: user.view(),
                        message: "created"
                    })
                } else {
                    res.status(400).json({
                        message: "created",
                        folderStatus: "the folder exist"
                    })
                }

            })
        }else{
            res.status(400).json({
                message: "User exists",
            })
        }
    })
}


module.exports = {findUser,create,profile}