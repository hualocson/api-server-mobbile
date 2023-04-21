import express from 'express'
import { categoryController } from '~api/controllers'
import productRoute from './products/index'
import variationRoute from './variations/index'

const router = express.Router()

// '/categories/products/'
router.use('/products', productRoute)

// '/categories/variations/'
router.use('/variations', variationRoute)

// #region /categories

// #region get

// [GET] '/categories/'
router.get('/', categoryController.getListCategory)

// [GET] '/categories/:id/products'
router.get('/:id/products', categoryController.getListProductByCategoryId)

// [GET] '/categories/:id/variations'
router.get('/:id/variations', categoryController.getListVariationByCategoryId)

// [GET] '/categories/:id'
router.get('/:id', categoryController.getCategoryById)
// #endregion get

// #region post

// [POST] '/categories/:id/variations'
router.post('/:id/variations', categoryController.createVariationByCategoryId)

// [POST] '/categories/'
router.post('/', categoryController.createCategory)

// #endregion post

// [PATCH] '/categories/:id'
router.patch('/:id', categoryController.updateCategory)

// [DELETE] '/categories/:id'
router.delete('/:id', categoryController.deleteCategory)

// #endregion /categories

export default router
