import responseHandler from '~api/handlers/response.handler.js'
import catchAsync from '~utils/catch-async.js'
import prisma from '~configs/prisma.client'
import { variationService } from '~api/services'
// [POST] '/categories/variations/options'
const createVariationOption = catchAsync(async (req, res) => {
  const { variationId, value } = req.body
  const variationOption = await variationService.createVariationOption(
    prisma,
    variationId,
    value,
  )
  responseHandler.created(res, { variationOption })
}, prisma)

// [GET] '/categories/variations/options'
const getAllVariationOptions = catchAsync(async (req, res) => {
  const variationOptions = await variationService.getAllVariationOptions(prisma)
  responseHandler.ok(res, { variationOptions })
}, prisma)

// [GET] '/categories/variations/options/:id'
const getVariationOptionById = catchAsync(async (req, res) => {
  const { id } = req.params
  const variationOption = await variationService.getVariationOptionById(
    prisma,
    id,
  )
  responseHandler.ok(res, { variationOption })
}, prisma)

// [PATCH] '/categories/variations/options/:id'
const updateVariationOption = catchAsync(async (req, res) => {
  const { id } = req.params
  const { value } = req.body
  const variationOption = await variationService.updateVariationOption(
    prisma,
    id,
    value,
  )
  responseHandler.ok(res, { variationOption })
}, prisma)

// [DELETE] '/categories/variations/options/:id'
const deleteVariationOption = catchAsync(async (req, res) => {
  const { id } = req.params
  const variationOption = await variationService.deleteVariationOption(
    prisma,
    id,
  )
  responseHandler.ok(res, { variationOption })
}, prisma)

export default {
  createVariationOption,
  deleteVariationOption,
  getAllVariationOptions,
  getVariationOptionById,
  updateVariationOption,
}
