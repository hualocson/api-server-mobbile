import express from 'express'
import { userController } from '~api/controllers/index.js'

const router = express.Router()

// get all users
router.get('/', userController.getAllUser)

// signup
router.post('/signup', userController.signUp)

// singin
router.post('/signin', userController.signIn)

export default router
