import { PrismaClient } from '@prisma/client'

import responseHandler from '~api/handlers/response.handler.js'
import { variationService } from '~api/services/index.js'
import catchAsync from '~utils/catch-async.js'

const prisma = new PrismaClient()

// [GET] '/categories/variations'
const getAllVariation = catchAsync(async (req, res) => {
  const variations = await variationService.getAllVariation(prisma)

  responseHandler.ok(res, { variations })
}, prisma)

// [GET] 'categories/variations/:id'
const getVariationById = catchAsync(async (req, res) => {
  const { id } = req.params

  const variation = await variationService.getVariationById(prisma, id)

  responseHandler.ok(res, { variation })
}, prisma)

// [POST] '/categories/variations'
const createVariation = catchAsync(async (req, res) => {
  const { name, categoryId } = req.body

  const variation = await variationService.createVariation(
    prisma,
    name,
    categoryId,
  )

  responseHandler.created(res, { variation })
}, prisma)

export default {
  createVariation,
  getAllVariation,
  getVariationById,
}
