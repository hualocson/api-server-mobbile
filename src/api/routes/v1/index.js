import { Router } from 'express'
import categoryRoute from './category.route.js'
import userRoute from './user.route.js'
import productRoute from './products'
import apidocsRoute from './apidocs.route.js'

const router = Router()

router.use('/categories', categoryRoute)

router.use('/docs', apidocsRoute)

router.use('/users', userRoute)

router.use('/products', productRoute)

export default router
