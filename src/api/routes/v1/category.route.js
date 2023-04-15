import express from 'express'
import { categoryController } from '~api/controllers'

const router = express.Router()

// [GET] '/categories/'
router.get('/', categoryController.getListCategory)

// [GET] '/categories/:id'
router.get('/:id', categoryController.getCategoryById)

// [POST] '/categories/'
router.post('/', categoryController.createCategory)

// [PATCH] '/categories/:id'
router.patch('/:id', categoryController.updateCategory)

// [DELETE] '/categories/:id'
router.delete('/:id', categoryController.deleteCategory)

export default router
