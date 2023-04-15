import httpStatus from 'http-status'
import ApiError from '~utils/api-error'
import osHelpers from '~helpers/index.js'
import cloudinaryService from './cloudinary.service.js'

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
  createProduct,
  createProductItem,
  getProducts,
  getProductsById,
  updateProductImage,
  updateProductItemImage,
}
