import { PrismaClient } from '@prisma/client'

import responseHandler from '~api/handlers/response.handler.js'
import { productService } from '~api/services'
import catchAsync from '~utils/catch-async.js'

const prisma = new PrismaClient()
// [GET] '/products'
const getProducts = catchAsync(async (req, res) => {
  const { products } = await productService.getProducts(prisma)
  responseHandler.ok(res, { products })
}, prisma)

// [GET] '/products/:productId'
const getProductsById = catchAsync(async (req, res) => {
  const { productId } = req.params
  const product = await productService.getProductsById(prisma, productId)
  responseHandler.ok(res, { product })
}, prisma)

// [POST] '/products'
const createProduct = catchAsync(async (req, res) => {
  const product = await productService.createProduct(prisma, req.body)
  responseHandler.created(res, { product })
}, prisma)

// [PATCH] '/products/:productId/image'
const updateProductImage = catchAsync(async (req, res) => {
  const { productId } = req.params
  const { imageUrl } = req.body
  const product = await productService.updateProductImage(
    prisma,
    productId,
    imageUrl,
  )
  responseHandler.ok(res, { product })
}, prisma)

export default {
  createProduct,
  getProducts,
  getProductsById,
  updateProductImage,
}
