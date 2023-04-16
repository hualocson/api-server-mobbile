import httpStatus from 'http-status'
import { osHelpers, cloudinaryHelpers } from '~helpers'
import ApiError from '~utils/api-error'
import cloudinaryService from '../cloudinary.service.js'

// [GET] '/products/items/:productItemId'
const getProductItemById = async (prisma, productItemId) => {
  const id = osHelpers.toNumber(productItemId)
  const productItem = await prisma.productItem.findUnique({
    where: { id },
    include: {
      product: {
        select: {
          name: true,
          description: true,
        },
      },
      productConfiguration: true,
    },
  })
  if (!productItem)
    throw new ApiError(httpStatus.NOT_FOUND, 'Product item not found')
  return productItem
}

// [PATCH] '/products/items/:productItemId/image'
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

// [POST] '/products/:productId/items'
const createProductItem = async (prisma, productId, body) => {
  const { qtyInStock, price, imageUrl } = body
  const id = osHelpers.toNumber(productId)
  const productItem = await prisma.productItem.create({
    data: { productId: id, qtyInStock, price, productImage: '' },
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
