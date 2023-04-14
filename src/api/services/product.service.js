import httpStatus from 'http-status'
import ApiError from '~utils/api-error'
import osHelpers from '~helpers/index.js'
import cloudinaryService from './cloudinary.service.js'

// [GET] '/products'
const getProducts = async (prisma) => {
  const products = await prisma.product.findMany()
  return { products }
}

// [PATCH] '/products/:id/image'
const updateProductImage = async (prisma, productId, imageUrl) => {
  const photoUrl = await cloudinaryService.uploadProductImageWithRemoteUrl(
    productId,
    imageUrl,
  )
  const id = osHelpers.toNumber(productId)
  const product = await prisma.product.update({
    where: { id },
    data: { productImage: photoUrl },
  })

  return product
}

// [POST] '/products'
const createProduct = async (prisma, body) => {
  const { categoryId, name, description, imageUrl } = body
  const product = await prisma.product.create({
    data: { categoryId, name, description, productImage: '' },
  })

  if (!product)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Create product failed')
  const updatedProduct = await updateProductImage(prisma, product.id, imageUrl)
  return { updatedProduct }
}

export default {
  getProducts,
  createProduct,
  updateProductImage,
}
