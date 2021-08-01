const { access, mkdir, unlink, rmdir } = require('fs/promises')
const { constants, statSync, readdir } = require('fs')
const path = require('path')
const utils = require('util')

const { spawn } = require('child_process')
const { config } = require('../../config')

//let localDrive = path.join(path.dirname(path.dirname(__dirname)), '/localDrive')

module.exports = {
    rootFolder: async (rootFolderName) => {

        let dest = config.localDrivePath + `/${rootFolderName}`
        try {
            await access(dest, constants.R_OK | constants.W_OK);
            return false
        } catch {
            await mkdir(dest)
            return true
        }
    },

    lookDirectory: async (directory) => {
        let content = {}
        let files = [];
        let directories = [];
        
        let ls = spawn('ls', {
            cwd: config.localDrivePath + `/${directory}`
        })

        for await (const data of ls.stdout) {
            let elements = String(data).trimRight().split("\n")
            for (let e = 0; e < elements.length; e++) {
                let path = config.localDrivePath + `/${directory}/${elements[e]}`

                if (statSync(path).isDirectory()) {
                    directories.push({
                        'path': `${directory}${elements[e]}`,
                        'name': elements[e],
                        'folder': true
                    })
                }
                if (statSync(path).isFile()) {
                    files.push({
                        'path': `${directory}${elements[e]}`,
                        'file': elements[e],
                        'size': statSync(path).size + ' bytes'
                    })
                }
            }
        }

        content["files"] = files
        content["directories"] = directories

        return content

    },

    createDirectory: async (path) => {
        let dest = config.localDrivePath + `${path}`
       
        try {
            await access(dest, constants.R_OK | constants.W_OK);
            return false
        } catch {
            await mkdir(dest)
            return true
        }
        
    },

    remove: async (path) => {
        try {
            let dest = config.localDrivePath + `${path}`
            await unlink(dest)
            return true
        } catch (error) {
            console.log(error)            
        }
    },

    removeDirectory: async(recursive, path) => {
        try {
            let dest = config.localDrivePath + `${path}`
            await rmdir(dest, {
                recursive: (recursive) ? recursive : false
            })
            return true
        } catch (error) {
            console.log(error)
            if(error.code === 'ENOTEMPTY'){
                return {
                    empty: false,
                    msg: 'Need to set recursive option'
                }
            }  
        }
    }
}