import express from 'express'
import { productController } from '~api/controllers'

const router = express.Router()

// get product by id
// [GET] /api/v1/products/:productId
router.get('/:productId', productController.getProductsById)

// get all products
// [GET] /api/v1/products
router.get('/', productController.getProducts)

// update product image
// [PATCH] /api/v1/products/:productId/image
router.patch('/:productId/image', productController.updateProductImage)

// create a product
// [POST] /api/v1/products
router.post('/', productController.createProduct)

// create a product item
// [POST] /api/v1/products/:productId/items
router.post('/:productId/items', productController.createProductItem)

export default router
