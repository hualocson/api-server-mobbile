import express from 'express'
import {
  getAllUser,
  signUp,
  signIn,
} from '../../controllers/user.controller.js'

const router = express.Router()

// get all user
router.get('/', getAllUser)

// signup
router.post('/signup', signUp)

// singin
router.post('/signin', signIn)

export default router
