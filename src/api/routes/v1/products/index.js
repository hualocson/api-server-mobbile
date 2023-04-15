import express from 'express'
import productRoute from './product.route'
import productItemRoute from './productItem.route'

const router = express.Router()

router.use('/items', productItemRoute)

router.use('/', productRoute)

export default router
