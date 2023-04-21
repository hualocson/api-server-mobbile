import express from 'express'
import productRoute from './product.route'
import productItemRoute from './productItem.route'

const router = express.Router()

// '/api/v1/categories/products' => '/products' -> all products in all category
// '/api/v1/categories/:id/products' => '/products' -> all products in a category

router.use('/items', productItemRoute)

router.use('/', productRoute)

export default router
