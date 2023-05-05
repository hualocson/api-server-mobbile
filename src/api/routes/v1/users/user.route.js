import express from 'express'
import middlewares from '~api/middlewares'
import { userController } from '~api/controllers/index.js'

const router = express.Router()

// [GET] /api/v1/users/profile
router.get('/profile', middlewares.isAuth, userController.getUserProfile)

// get all users
// [GET] /api/v1/users
router.get('/', middlewares.isAuth, userController.getAllUser)

// signup
// [POST] /api/v1/users/signup
router.post('/signup', userController.signUp)

// singin
// [POST] /api/v1/users/signin
router.post('/signin', userController.signIn)

// check email
// [POST] 'api/v1/users/email'
router.post('/email', userController.checkUserEmail)

// update user
// [PATCH] /api/v1/users
router.patch('/', middlewares.isAuth, userController.updateUser)

export default router
