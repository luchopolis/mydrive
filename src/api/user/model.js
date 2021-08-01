const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

let roles = ['user']

const userSchema = new Schema(
    {
        username: {
            type: String,
            require: true,
            unique: true
        },
        password: { 
            type: String,
            require: true
        },
        email: {
            type: String,
            unique: true
        },
        rol: {
            type: String,
            enum: roles
        },
        image: {
            type: String
        },
        pathFolder: {
            type: String
        }
    },
    {collection: 'users'}
)

// userSchema.path('pathFolder').set((dName) => {
//     let pathFolderName = `${dName}folderRooti`
//     return pathFolderName
// })

userSchema.pre('save',function(next){
    let pathFolderName = `${this.username}folderRoot`
    this.pathFolder = pathFolderName

    bcrypt.hash(this.password,10).then((hash) => {
        this.password = hash
        next()
    }).catch((err) => next(err) )
})

userSchema.methods = {
    view () {
        const view = {
            id: this.id,
            username: this.username,
            email: this.email,
            pathFolder: this.pathFolder,
            image: this.image
        }

        return view
    },

    async matchPassword(inPassword){
        return await bcrypt.compare(inPassword, this.password) ? true : false
    }
}
module.exports = mongoose.model('User',userSchema)