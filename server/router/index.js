const Router = require('express')
const router = new Router()
const {body} = require('express-validator')
const authController = require('../controllers/authController')
const fileController = require('../controllers/fileController')
const authMiddleware = require('../middlewares/authMiddleware')

router.post('/auth/registration', 
    body('email').isEmail(),
    body('password').isLength({min: 4, max: 15})
, authController.registration)
router.post('/auth/login', authController.login)
router.get('/auth/check', authMiddleware, authController.checkAuth)


router.post('/files', authMiddleware, fileController.createDir)
router.post('/files/upload', authMiddleware, fileController.uploadFile)
router.post('/files/avatar', authMiddleware, fileController.uploadAvatar)
router.get('/files', authMiddleware, fileController.getFiles)
router.get('/files/download', authMiddleware, fileController.downloadFile)
router.get('/files/search', authMiddleware, fileController.searchFile)
router.delete('/files', authMiddleware, fileController.deleteFile)
router.delete('/files/avatar', authMiddleware, fileController.removeAvatar)

module.exports = router