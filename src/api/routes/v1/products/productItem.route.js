import express from 'express'
import { productController } from '~api/controllers'

const router = express.Router()

// update product item image
router.patch('/:productItemId/image', productController.updateProductItemImage)

export default router
