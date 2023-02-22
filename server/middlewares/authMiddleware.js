const ApiError = require("../exceptions/apiError")
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    if(req.method === 'OPTIONS') {
        next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]
        if(!token) {
            return next(ApiError.UnauthorizedError())
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        if(!decoded) {
            return next(ApiError.UnauthorizedError())
        }

        req.user = decoded
        next()
    } catch(e) {
        next(ApiError.UnauthorizedError())
    }
}