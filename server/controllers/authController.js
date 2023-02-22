const User = require('../models/User')
const bcrypt = require('bcrypt')
const ApiError = require('../exceptions/apiError')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const fileService = require('../services/fileService')
const File = require('../models/File')

const generateToken = (id, email) => {
    return jwt.sign({id, email}, process.env.SECRET_KEY, {expiresIn: '24h'})
}

class AuthController {
    async registration(req, res, next) {
        try {   
            const errors = validationResult(req)

            if(!errors.isEmpty()) {
                return next(ApiError.BadRequest('Validation error', errors.array()))
            }

            const {email, password} = req.body

            const candidate = await User.findOne({email})

            if(candidate) {
                return next(ApiError.BadRequest(`User with email adress - ${email} is already exists`))
            }

            const hashPassword = await bcrypt.hash(password, 5)
            const user = await User.create({email, password: hashPassword})

            await fileService.createDir(new File({user: user._id, name: '', type: ''}))

            const token = generateToken(user._id, email)

            return res.json({
                token, user
            })
        } catch(e) {
            next(e)
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body

            const user = await User.findOne({email})
            if(!user) {
                return next(ApiError.BadRequest('User not found'))
            }

            const decodedPassword = await bcrypt.compare(password, user.password)
            if(!decodedPassword) {
                return next(ApiError.BadRequest('Incorrect password'))
            }

            const token = generateToken(user._id, email)

            return res.json({
                token, user
            })
            
        } catch(e) {
            next(e)
        }
    }

    async checkAuth(req, res, next) {
        try {
            const user = await User.findById(req.user.id)

            const token = generateToken(req.user.id, req.user.email)
            return res.json({
                token, user
            })
        } catch(e) {
            next(e)
        }
    }
}

module.exports = new AuthController()