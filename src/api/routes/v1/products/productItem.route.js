import express from 'express'
import { productController } from '~api/controllers'

const router = express.Router()

// [GET] /api/v1/products/:productId/items/:productItemId
router.get('/:productItemId', productController.getProductItemById)

// update product item image
// [PATCH] /api/v1/products/:productId/items/:productItemId/image
router.patch('/:productItemId/image', productController.updateProductItemImage)

export default router
