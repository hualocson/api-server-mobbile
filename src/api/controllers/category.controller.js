import { PrismaClient } from '@prisma/client'

import responseHandler from '~api/handlers/response.handler.js'
import { categoryService } from '~api/services'
import catchAsync from '~utils/catch-async.js'

const prisma = new PrismaClient()

// [GET] '/categories/'
const getListCategory = catchAsync(async (req, res) => {
  const { categories } = await categoryService.getListCategory(prisma)

  responseHandler.ok(res, { categories })
}, prisma)

// [GET] '/categories/:id'
const getCategoryById = catchAsync(async (req, res) => {
  const { id } = req.params

  const category = await categoryService.getCategoryById(prisma, id)

  responseHandler.ok(res, { category })
}, prisma)

// [POST] '/categories/'
const createCategory = catchAsync(async (req, res) => {
  const category = await categoryService.createCategory(prisma, req.body)

  responseHandler.created(res, { category })
}, prisma)

// [PATCH] '/categories/:id'
const updateCategory = catchAsync(async (req, res) => {
  const { id } = req.params
  const category = await categoryService.updateCategory(prisma, id, req.body)

  responseHandler.ok(res, { category })
}, prisma)

// [DELETE] '/categories/:id'
const deleteCategory = catchAsync(async (req, res) => {
  const { id } = req.params
  const category = await categoryService.deleteCategory(prisma, id)

  responseHandler.ok(res, { category })
}, prisma)

export default {
  createCategory,
  deleteCategory,
  getListCategory,
  getCategoryById,
  updateCategory,
}
