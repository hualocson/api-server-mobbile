import responseHandler from '~api/handlers/response.handler.js'
import prisma from '~configs/prisma.client'
import catchAsync from '~utils/catch-async.js'
import { productService } from '~api/services'

// [GET] '/products/items/:productItemId'
const getProductItemById = catchAsync(async (req, res) => {
  const { productItemId } = req.params
  const productItem = await productService.getProductItemById(
    prisma,
    productItemId,
  )
  responseHandler.ok(res, productItem)
}, prisma)

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

// in product route
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
  getProductItemById,
  createProductItem,
  updateProductItemImage,
}
