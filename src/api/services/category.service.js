import httpStatus from 'http-status'
import { osHelpers, cloudinaryHelpers } from '~/helpers/index'
import ApiError from '~utils/api-error'
import cloudinaryService from './cloudinary.service'
import variationService from './variations/variation.service'

// [GET] '/categories'
const getListCategory = async (prisma) => {
  const categories = await prisma.productCategory.findMany()

  return { categories }
}

// [GET] '/categories/:id'
const getCategoryById = async (prisma, id) => {
  const categoryId = osHelpers.toNumber(id)

  const category = await prisma.productCategory.findUnique({
    where: { id: categoryId },
  })

  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found')
  }

  return category
}

// [GET] '/categories/:id/products'
const getListProductByCategoryId = async (prisma, id) => {
  const categoryId = osHelpers.toNumber(id)

  const category = await prisma.productCategory.findUnique({
    where: { id: categoryId },
    include: { products: true },
  })

  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found')
  }

  return category
}
// variations
// [POST] '/categories/:id/variations'
const createVariationByCategoryId = async (prisma, id, body) => {
  const categoryId = osHelpers.toNumber(id)
  const { name } = body
  const variation = await variationService.createVariation(
    prisma,
    name,
    categoryId,
  )
  return variation
}

// [GET] '/categories/:id/variations'
const getListVariationByCategoryId = async (prisma, id) => {
  const categoryId = osHelpers.toNumber(id)
  const category = await prisma.productCategory.findUnique({
    where: { id: categoryId },
    include: { variations: true },
  })
  return category
}
// end variations
// [POST] '/categories'
const createCategory = async (prisma, body) => {
  const { categoryName, icUrl } = body

  let category
  if (icUrl) {
    category = await prisma.productCategory.create({
      data: { categoryName, icUrl },
    })
  } else {
    category = await prisma.productCategory.create({
      data: { categoryName },
    })
  }

  if (!category) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Create new category failed')
  }

  return category
}

// [PATCH] '/categories/:id'
const updateCategory = async (prisma, id, body) => {
  const categoryId = osHelpers.toNumber(id)
  const { categoryName, icUrl } = body
  const categoryExist = await prisma.productCategory.findUnique({
    where: {
      id: categoryId,
    },
  })
  if (!categoryExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found')
  }
  let category
  if (categoryName && icUrl) {
    const ic = await cloudinaryService.uploadImage(
      icUrl,
      cloudinaryHelpers.getCategoryFolder(),
      `ic-category-${categoryId}`,
    )
    category = await prisma.productCategory.update({
      where: { id: categoryId },
      data: { categoryName, icUrl: ic },
    })
  } else if (categoryName && !icUrl) {
    category = await prisma.productCategory.update({
      where: { id: categoryId },
      data: { categoryName },
    })
  } else if (!categoryName && icUrl) {
    const ic = await cloudinaryService.uploadImage(
      icUrl,
      cloudinaryHelpers.getCategoryFolder(),
      `ic-category-${categoryId}`,
    )
    category = await prisma.productCategory.update({
      where: { id: categoryId },
      data: { icUrl: ic },
    })
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Update category failed')
  }
  if (!category) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Update category failed')
  }

  return category
}

// [DELETE] '/categories/:id'
const deleteCategory = async (prisma, id) => {
  const categoryId = osHelpers.toNumber(id)
  const categoryExist = await prisma.productCategory.findUnique({
    where: {
      id: categoryId,
    },
  })
  if (!categoryExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found')
  }
  const category = await prisma.productCategory.delete({
    where: { id: categoryId },
  })

  if (!category) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Delete category failed')
  }

  return category
}

export default {
  createCategory,
  createVariationByCategoryId,
  deleteCategory,
  getListCategory,
  getCategoryById,
  getListVariationByCategoryId,
  getListProductByCategoryId,
  updateCategory,
}
