import httpStatus from 'http-status'
import { osHelpers, cloudinaryHelpers } from '~helpers/index.js'
import ApiError from '~utils/api-error'
import cloudinaryService from '../cloudinary.service.js'

// [GET] '/products'
const getProducts = async (prisma) => {
  const products = await prisma.product.findMany()
  return { products }
}

// [GET] '/products/:productId'
const getProductsById = async (prisma, productId) => {
  const id = osHelpers.toNumber(productId)
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      productItems: {
        select: {
          id: true,
          qtyInStock: true,
          price: true,
          productImage: true,
        },
      },
    },
  })
  if (!product) throw new ApiError(httpStatus.NOT_FOUND, 'Product not found')
  return product
}

// [PATCH] '/products/:productId/image'
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

// [POST] '/products'
const createProduct = async (prisma, body) => {
  const { categoryId, name, description, imageUrl } = body
  const id = osHelpers.toNumber(categoryId)
  const product = await prisma.product.create({
    data: { categoryId: id, name, description, productImage: '' },
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
  updateProductImage,
}
