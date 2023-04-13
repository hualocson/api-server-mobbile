import express from 'express'
import { productController } from '~api/controllers/index.js'

const router = express.Router()

// update product image
router.patch('/:productId/image', productController.updateProductImage)

// get all products
router.get('/', productController.getProducts)

// create a product
router.post('/', productController.createProduct)

export default router
