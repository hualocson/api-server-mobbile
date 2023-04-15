import express from 'express'
import { productController } from '~api/controllers/index.js'

const router = express.Router()

// update product item image
router.patch(
  '/items/:productItemId/image',
  productController.updateProductItemImage,
)

// update product image
router.patch('/:productId/image', productController.updateProductImage)

// get product by id
router.get('/:productId', productController.getProductsById)

// get all products
router.get('/', productController.getProducts)

// create a product item
router.post('/:productId/items', productController.createProductItem)

// create a product
router.post('/', productController.createProduct)

export default router
