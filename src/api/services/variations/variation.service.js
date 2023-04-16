import httpStatus from 'http-status'
import ApiError from '~utils/api-error'
import { osHelpers } from '~helpers'

// [GET] '/categories/variations'
const getAllVariation = async (prisma) => {
  const variations = await prisma.variation.findMany()

  return variations
}

// [GET] 'categories/variations/:id'
const getVariationById = async (prisma, id) => {
  const vaId = osHelpers.toNumber(id)

  const variation = await prisma.variation.findUnique({
    where: { id: vaId },
  })
  if (!variation)
    throw new ApiError(httpStatus.NOT_FOUND, 'Variation not found')

  return variation
}

// [POST] '/categories/variations'
const createVariation = async (prisma, name, categoryId) => {
  const caId = osHelpers.toNumber(categoryId)

  const category = await prisma.productCategory.findUnique({
    where: { id: caId },
  })
  if (!category) throw new ApiError(httpStatus.NOT_FOUND, 'Category not found')

  const variation = await prisma.variation.create({
    data: {
      name,
      category: {
        connect: {
          id: caId,
        },
      },
    },
  })

  return variation
}

export default {
  createVariation,
  getAllVariation,
  getVariationById,
}
