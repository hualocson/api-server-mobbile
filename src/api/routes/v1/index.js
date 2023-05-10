import { Router } from 'express'
import categoryRoute from './category.route.js'
import cartRoute from './cart.route.js'
import userRoute from './users/index'
import shippingRoute from './shipping.route.js'
import apidocsRoute from './apidocs.route.js'

const router = Router()

router.use('/categories', categoryRoute)

router.use('/cart', cartRoute)

router.use('/docs', apidocsRoute)

router.use('/users', userRoute)

router.use('/shippings', shippingRoute)

export default router
