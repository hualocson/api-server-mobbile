import express from 'express'
import middlewares from '~/api/middlewares'
import { productController } from '~api/controllers'

const router = express.Router()

// [GET] /api/v1/categories/products/:productId/items/:productItemId
router.get('/:productItemId', productController.getProductItemById)

// [PATCH] /api/v1/categories/products/items/:productItemId
router.patch(
  '/:productItemId',
  middlewares.isAdmin,
  productController.updateProductItem,
)

// update product item image
// [PATCH] /api/v1/categories/products/items/:productItemId/image
router.patch('/:productItemId/image', productController.updateProductItemImage)

export default router
