import httpStatus from 'http-status'
import osHelpers from '~helpers'
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
  return updatedProduct
}

export default {
  createProduct,
  getProducts,
  getProductsById,
  updateProductImage,
}
