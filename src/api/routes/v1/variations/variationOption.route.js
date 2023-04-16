import express from 'express'
import { variationController } from '~api/controllers'

const router = express.Router()

// [POST] '/categories/variations/options'
router.post('/', variationController.createVariationOption)

// [GET] '/categories/variations/options'
router.get('/', variationController.getAllVariationOptions)

// [GET] '/categories/variations/options/:id'
router.get('/:id', variationController.getVariationOptionById)

// [PATCH] '/categories/variations/options/:id'
router.patch('/:id', variationController.updateVariationOption)

// [DELETE] '/categories/variations/options/:id'
router.delete('/:id', variationController.deleteVariationOption)

export default router
