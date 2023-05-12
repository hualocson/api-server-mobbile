import { Router } from 'express'
import categoryRoute from './category.route.js'
import cartRoute from './cart.route.js'
import userRoute from './users/index'
import shippingRoute from './shipping.route.js'
import orderRoute from './order.route.js'
import apidocsRoute from './apidocs.route.js'
import newsRoute from './news.route.js'

const router = Router()

router.use('/categories', categoryRoute)

router.use('/cart', cartRoute)

router.use('/docs', apidocsRoute)

router.use('/users', userRoute)

router.use('/shippings', shippingRoute)

router.use('/orders', orderRoute)

router.use('/news', newsRoute)

export default router
