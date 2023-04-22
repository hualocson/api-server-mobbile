import httpStatus from 'http-status'
import { osHelpers, cloudinaryHelpers } from '~helpers'
import ApiError from '~utils/api-error'
import models from '~api/models/index.js'
import cloudinaryService from '../cloudinary.service.js'

// [GET] '/categories/products/items/:productItemId'
const getProductItemById = async (prisma, productItemId) => {
  const id = osHelpers.toNumber(productItemId)
  const productItem = await prisma.productItem.findUnique({
    where: { id },
    include: {
      // product: {
      //   select: {
      //     name: true,
      //     description: true,
      //   },
      // },
      productConfigurations: models.utils.productConfigurationsSelectOptions,
    },
  })
  if (!productItem)
    throw new ApiError(httpStatus.NOT_FOUND, 'Product item not found')

  const result = models.productItemInstance(productItem)
  return result
}

// [PATCH] '/categories/products/items/:productItemId/image'
const updateProductItemImage = async (prisma, productItemId, imageUrl) => {
  const id = osHelpers.toNumber(productItemId)
  const productItem = await prisma.productItem.findUnique({ where: { id } })
  if (!productItem)
    throw new ApiError(httpStatus.NOT_FOUND, 'Product item not found')

  const photoUrl = await cloudinaryService.uploadImage(
    imageUrl,
    cloudinaryHelpers.getProductFolder(productItem.productId),
    `item-${productItem.id}`,
  )
  const updatedProductItem = await prisma.productItem.update({
    where: { id: productItem.id },
    data: { productImage: photoUrl },
  })

  return updatedProductItem
}

// [POST] '/categories/products/:productId/items'
const createProductItem = async (prisma, productId, body) => {
  const { qtyInStock, price, imageUrl, productConfigurations } = body
  const proId = osHelpers.toNumber(productId)
  if (qtyInStock < 0 || price < 0 || !imageUrl || !productConfigurations)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid data')

  const variationOptions = productConfigurations.map((item) => {
    return {
      variationOption: {
        create: { ...item },
      },
    }
  })

  const productItem = await prisma.productItem.create({
    data: {
      productId: proId,
      qtyInStock,
      price,
      productImage: '',
      productConfigurations: {
        create: variationOptions,
      },
    },
  })

  if (!productItem)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Create product item failed')

  const updatedProductItem = await updateProductItemImage(
    prisma,
    productItem.id,
    imageUrl,
  )
  if (!updatedProductItem)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Create product item failed')
  return updatedProductItem
}

export default {
  getProductItemById,
  createProductItem,
  updateProductItemImage,
}
