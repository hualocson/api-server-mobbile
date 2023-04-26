import httpStatus from 'http-status'
import { osHelpers, cloudinaryHelpers } from '~helpers/index.js'
import ApiError from '~utils/api-error'
import models from '~/api/models/index.js'
import utils from '~api/services/utils.js'
import cloudinaryService from '../cloudinary.service.js'

// [GET] '/categories/products'
const getProducts = async (prisma) => {
  const products = await prisma.product.findMany()

  const aggregate = await Promise.all(
    products.map((item) => utils.aggregateProductItemPrice(item.id)),
  )

  const result = products.map((item, index) =>
    models.productInstance(item, aggregate[index]),
  )

  return { result }
}

// [GET] '/categories/products/:productId'
const getProductsById = async (prisma, productId) => {
  const id = osHelpers.toNumber(productId)
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      productItems: {
        select: {
          id: true,
          productImage: true,
          price: true,
          qtyInStock: true,
          productConfigurations:
            models.utils.productConfigurationsSelectOptions,
        },
      },
    },
  })

  const aggregate = await utils.aggregateProductItemPrice(id)

  if (!product) throw new ApiError(httpStatus.NOT_FOUND, 'Product not found')
  const returnProduct = models.productInstance(product, aggregate)
  return returnProduct
}

// [GET] '/categories/:id/products/'
const getProductsByCategoryId = async (prisma, categoryId) => {
  const id = osHelpers.toNumber(categoryId)
  const products = await prisma.product.findMany({
    where: { categoryId: id },
  })

  const aggregate = await Promise.all(
    products.map((item) => utils.aggregateProductItemPrice(item.id)),
  )

  const result = products.map((item, index) =>
    models.productInstance(item, aggregate[index]),
  )
  return result
}

// [PATCH] '/categories/products/:productId/image'
const updateProductImage = async (prisma, productId, imageUrl) => {
  const id = osHelpers.toNumber(productId)

  if (!imageUrl)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Image url is required')

  const product = await prisma.product.findUnique({ where: { id } })
  if (!product) throw new ApiError(httpStatus.NOT_FOUND, 'Product not found')
  const photoUrl = await cloudinaryService.uploadImage(
    imageUrl,
    cloudinaryHelpers.getProductFolder(productId),
  )
  const updatedProduct = await prisma.product.update({
    where: { id },
    data: { productImage: photoUrl },
  })

  if (!product)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Update image failed')
  return updatedProduct
}

// [POST] '/categories/products'
const createProduct = async (prisma, body) => {
  const { categoryId, name, description, imageUrl } = body
  const id = osHelpers.toNumber(categoryId)
  const product = await prisma.product.create({
    data: {
      name,
      description,
      productImage: '',
      category: {
        connect: {
          id,
        },
      },
    },
  })

  if (!product)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Create product failed')
  const updatedProduct = await updateProductImage(prisma, product.id, imageUrl)
  return updatedProduct
}

export default {
  createProduct,
  getProducts,
  getProductsById,
  getProductsByCategoryId,
  updateProductImage,
}
