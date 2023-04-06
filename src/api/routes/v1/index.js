import { Router } from 'express'
import userRoute from './user.route.js'

const router = Router()

router.use(
  '/users',
  userRoute,
  // #swagger.auto = false
)

export default router
