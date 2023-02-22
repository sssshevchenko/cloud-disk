const fs = require('fs')
const path = require('path')
const File = require('../models/File')

class FileService {
    createDir(file) {
        const filePath = path.resolve(__dirname, '..', 'files', `${file.user}`, `${file.path}`)

        return new Promise((resolve, reject) => {
            try {
                if(!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath)
                    return resolve({message: 'File created'})
                } else {
                    return reject({message: 'File is already exists'})
                }
            } catch(e) {
                return reject({message: 'File error'})
            }
        })
    }

    deleteFile(file) {
        const filePath = path.resolve(__dirname, '..', 'files', `${file.user}`, `${file.path}`)
        if(file.type === 'dir') {
            fs.rmdirSync(filePath)
        } else {
            fs.unlinkSync(filePath)
        }
    }
}

module.exports = new FileService()