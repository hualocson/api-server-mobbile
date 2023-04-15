import express from 'express'
import middlewares from '~api/middlewares'
import { userController } from '~api/controllers/index.js'

const router = express.Router()

// get all users
// [GET] /api/v1/users
router.get('/', middlewares.isAuth, userController.getAllUser)

// signup
// [POST] /api/v1/users/signup
router.post('/signup', userController.signUp)

// singin
// [POST] /api/v1/users/signin
router.post('/signin', userController.signIn)

export default router
