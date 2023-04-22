import responseHandler from '~api/handlers/response.handler.js'
import catchAsync from '~utils/catch-async.js'
import prisma from '~configs/prisma.client'
import { productService } from '~api/services'
// [GET] '/categories/products'
const getProducts = catchAsync(async (req, res) => {
  const { result } = await productService.getProducts(prisma)
  responseHandler.ok(res, { products: result })
}, prisma)

// [GET] '/categories/products/:productId'
const getProductsById = catchAsync(async (req, res) => {
  const { productId } = req.params
  const product = await productService.getProductsById(prisma, productId)
  responseHandler.ok(res, { product })
}, prisma)

// [POST] '/categories/products'
const createProduct = catchAsync(async (req, res) => {
  const product = await productService.createProduct(prisma, req.body)
  responseHandler.created(res, { product })
}, prisma)

// [PATCH] '/categories/products/:productId/image'
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
