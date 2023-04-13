import { Router } from 'express'
import userRoute from './user.route.js'
import productRoute from './product.route.js'

const router = Router()

router.use(
  '/users',
  userRoute,
  // #swagger.auto = false
)

router.use('/products', productRoute)

export default router
