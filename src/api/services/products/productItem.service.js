import httpStatus from 'http-status'
import osHelpers from '~helpers'
import ApiError from '~utils/api-error'
import cloudinaryService from '../cloudinary.service.js'

// [PATCH] '/products/items/:productItemId/image'
const updateProductItemImage = async (prisma, productItemId, imageUrl) => {
  const id = osHelpers.toNumber(productItemId)
  const productItem = await prisma.productItem.findUnique({ where: { id } })
  if (!productItem)
    throw new ApiError(httpStatus.NOT_FOUND, 'Product item not found')
  const photoUrl = await cloudinaryService.uploadProductImageWithRemoteUrl(
    productItem.productId,
    imageUrl,
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
  createProductItem,
  updateProductItemImage,
}
