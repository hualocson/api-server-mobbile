import express from 'express'
import { productController } from '~api/controllers'

const router = express.Router()

// get product by id
router.get('/:productId', productController.getProductsById)

// get all products
router.get('/', productController.getProducts)

// update product image
router.patch('/:productId/image', productController.updateProductImage)

// create a product
router.post('/', productController.createProduct)

// create a product item
router.post('/:productId/items', productController.createProductItem)

export default router
