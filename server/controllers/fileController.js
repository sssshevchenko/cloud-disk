const fileService = require('../services/fileService')
const File = require('../models/File')
const ApiError = require('../exceptions/apiError')
const User = require('../models/User')
const path = require('path')
const fs = require('fs')
const uuid = require('uuid')

class FileController {
    async createDir(req, res, next) {
        try {
            const {name, type, parent} = req.body
            const existFile = await File.findOne({name})
            if(existFile) {
                return next(ApiError.BadRequest({message: 'File already exists'}))
            }

            const file = await File.create({name, type, parent, user: req.user.id})
            const parentFile = await File.findById(parent)

            if(!parentFile) {
                file.path = name
                await fileService.createDir(file)
            } else {
                file.path = `${parentFile.path}/${file.name}`
                await fileService.createDir(file)
                parentFile.childs.push(file._id)
                await parentFile.save()
            }

            await file.save()
            return res.json(file)
        } catch(e) {
            next(e)
        }
    }

    async getFiles(req, res, next) {
        try {
            const {sort} = req.query

            let files

            switch (sort) {
                case 'name':
                    files = await File.find({user: req.user.id, parent: req.query.parent}).sort({name: 1})
                    break;
                case 'date':
                    files = await File.find({user: req.user.id, parent: req.query.parent}).sort({date: 1})
                    break;
                case 'type':
                    files = await File.find({user: req.user.id, parent: req.query.parent}).sort({type: 1})
                    break;
                    
                default:
                    files = await File.find({user: req.user.id, parent: req.query.parent})
                    break;
            }

            return res.json(files)
        } catch(e) {
            next(e)
        }
    }

    async uploadFile(req, res, next) {
        try {
            const file = req.files.file

            const parent = await File.findOne({user: req.user.id, _id: req.body.parent})
            const user = await User.findById(req.user.id)

            if(user.usedSpace + file.size > user.diskSpace) {
                return next(ApiError.BadRequest('There is no space on disk'))
            }

            user.usedSpace += file.size

            let filesPath

            if(parent) {
                filesPath = path.resolve(__dirname, '..', 'files', `${user._id}`, `${parent.path}`, `${file.name}`)
                parent.size += file.size
                await parent.save()
            } else {
                filesPath = path.resolve(__dirname, '..', 'files', `${user._id}`, `${file.name}`)
            }

            if(fs.existsSync(filesPath)) {
                return next(ApiError.BadRequest('File already exists'))
            }

            file.mv(filesPath)

            const type = file.name.split('.').pop()

            let filePath = file.name

            if(parent) {
                filePath = parent.path + '/' + file.name
            }

            const dbFile = await File.create({
                name: file.name,
                type,
                path: filePath,
                size: file.size,
                parent: parent?._id,
                user: user._id
            })

            await user.save()

            return res.json(dbFile)
        } catch(e) {
            next(e)
        }
    }

    async downloadFile(req, res, next) {
        try {
            const file = await File.findOne({_id: req.query.id, user: req.user.id})
            const filePath = path.resolve(__dirname, '..', 'files', `${req.user.id}`, `${file.path}`, `${file.name}`)

            if(fs.existsSync(filePath)) {
                return res.download(filePath, file.name)
            }

            return next(ApiError.BadRequest('Download error'))
        } catch(e) {
            next(e)
        }
    }

    async deleteFile(req, res, next) {
        try {
            const file = await File.findOne({_id: req.query.id, user: req.user.id})
            if(!file) {
                return next(ApiError.BadRequest('File not found'))
            }

            fileService.deleteFile(file)
            await file.remove()

            return res.json({message: 'File was deleted'})
        } catch(e) {
            next(e)
        }
    }

    async searchFile(req, res, next) {
        try {
            const {search} = req.query
            let files = await File.find({user: req.user.id})
            files = files.filter(file => file.name.includes(search))
            
            return res.json(files)
        } catch(e) {
            next(e)
        }
    }

    async uploadAvatar(req, res, next) {
        try {
            const {file} = req.files
            const user = await User.findById(req.user.id)

            const avatarName = uuid.v4() + '.jpg'

            file.mv(path.resolve(__dirname, '..', 'static', `${avatarName}`))

            user.avatar = avatarName

            await user.save()
            return res.json(user)
        } catch(e) {
            next(e)
        }
    }

    async removeAvatar(req, res, next) {
        try {
            const user = await User.findById(req.user.id)
            const avatarPath = path.resolve(__dirname, '..', 'static', `${user.avatar}`)

            fs.unlinkSync(avatarPath)

            user.avatar = null
            await user.save()

            return res.json(user)
        } catch(e) {
            next(e)
        }
    }
}

module.exports = new FileController()