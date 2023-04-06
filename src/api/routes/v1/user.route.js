import express from 'express'
import {
  getAllUser,
  signUp,
  signIn,
} from '../../controllers/user.controller.js'

const router = express.Router()

// get all users
router.get('/', getAllUser)

// signup
router.post(
  '/signup',
  signUp,
  // #swagger.start
  // #swagger.path = '/users/signup'
  // #swagger.method = 'post'
  // #swagger.tags = ['User']
  // #swagger.description = 'Create new user'
  // #swagger.end
)

// singin
router.post('/signin', signIn)

export default router
