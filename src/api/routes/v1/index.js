import { Router } from 'express'
import userRoute from './user.route.js'
import productRoute from './products'
import apidocsRoute from './apidocs.route.js'

const router = Router()

router.use('/users', userRoute)

router.use('/products', productRoute)

router.use('/docs', apidocsRoute)

export default router
