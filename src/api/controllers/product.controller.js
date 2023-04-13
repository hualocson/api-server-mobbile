import { PrismaClient } from '@prisma/client'

import responseHandler from '~api/handlers/response.handler.js'
import { productService } from '~api/services/index.js'
import catchAsync from '~utils/catch-async.js'

const prisma = new PrismaClient()

// [GET] '/products'
const getProducts = catchAsync(async (req, res) => {
  const { products } = await productService.getProducts(prisma)
  responseHandler.ok(res, { products })
}, prisma)

// [POST] '/products'
const createProduct = catchAsync(async (req, res) => {
  const { updatedProduct } = await productService.createProduct(
    prisma,
    req.body,
  )
  responseHandler.created(res, { updatedProduct })
}, prisma)

// [PATCH] '/products/:id/image'
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
export default { getProducts, createProduct, updateProductImage }
