import express from 'express'
import { categoryController } from '~api/controllers'
import productRoute from './products/index'
import variationRoute from './variations/index'

const router = express.Router()

// '/categories/products/'
router.use('/products', productRoute)

// '/categories/variations/'
router.use('/variations', variationRoute)

// [GET] '/categories/'
router.get('/', categoryController.getListCategory)

// [GET] '/categories/:id/products'
router.get('/:id/products', categoryController.getListProductByCategoryId)

// [GET] '/categories/:id'
router.get('/:id', categoryController.getCategoryById)

// variations
// [POST] '/categories/:id/variations'
router.post('/:id/variations', categoryController.createVariationByCategoryId)

// [GET] '/categories/:id/variations'
router.get('/:id/variations', categoryController.getListVariationByCategoryId)
// end variations

// [POST] '/categories/'
router.post('/', categoryController.createCategory)

// [PATCH] '/categories/:id'
router.patch('/:id', categoryController.updateCategory)

// [DELETE] '/categories/:id'
router.delete('/:id', categoryController.deleteCategory)

export default router
