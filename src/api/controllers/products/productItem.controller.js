import { PrismaClient } from '@prisma/client'

import responseHandler from '~api/handlers/response.handler.js'
import { productService } from '~api/services'
import catchAsync from '~utils/catch-async.js'

const prisma = new PrismaClient()

// [POST] '/products/:productId/items'
const createProductItem = catchAsync(async (req, res) => {
  const { productId } = req.params
  const productItem = await productService.createProductItem(
    prisma,
    productId,
    req.body,
  )
  responseHandler.created(res, { productItem })
}, prisma)

// [PATCH] '/products/items/:productItemId/image'
const updateProductItemImage = catchAsync(async (req, res) => {
  const { productItemId } = req.params
  const { imageUrl } = req.body
  const productItem = await productService.updateProductItemImage(
    prisma,
    productItemId,
    imageUrl,
  )
  responseHandler.ok(res, { productItem })
}, prisma)

export default {
  createProductItem,
  updateProductItemImage,
}
