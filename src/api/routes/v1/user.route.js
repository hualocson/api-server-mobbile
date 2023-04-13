import express from 'express'
import middlewares from '~api/middlewares'
import { userController } from '~api/controllers/index.js'

const router = express.Router()

// get all users
router.get('/', middlewares.isAuth, userController.getAllUser)

// signup
router.post('/signup', userController.signUp)

// singin
router.post('/signin', userController.signIn)

export default router
