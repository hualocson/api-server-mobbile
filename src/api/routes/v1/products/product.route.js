import express from 'express'
import { productController } from '~api/controllers'

const router = express.Router()

// create a product item
// [POST] /api/v1/categories/products/:productId/items
router.post('/:productId/items', productController.createProductItem)

// update product image
// [PATCH] /api/v1/categories/products/:productId/image
router.patch('/:productId/image', productController.updateProductImage)

// [GET] /api/v1/categories/products/:productId/variations
router.get(
  '/:productId/variations',
  productController.getProductVariationsByProductId,
)

// get product by id
// [GET] /api/v1/categories/products/:productId
router.get('/:productId', productController.getProductsById)

// get all products
// [GET] /api/v1/categories/products
router.get('/', productController.getProducts)

// create a product
// [POST] /api/v1/categories/products
router.post('/', productController.createProduct)

export default router
