import express from 'express'
import { variationController } from '~api/controllers'

const router = express.Router()

// [GET] '/categories/variations'
router.get('/', variationController.getAllVariation)

// #region 'categories/variations/:id'
// [GET] '/categories/variations/:id/options'
router.get('/:id/options', variationController.getAllOptionsInVariation)
// #endregion

// [GET] 'categories/variations/:id'
router.get('/:id', variationController.getVariationById)

// [POST] '/categories/variations'
router.post('/', variationController.createVariation)

export default router
