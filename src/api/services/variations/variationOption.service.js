import httpStatus from 'http-status'
import { osHelpers } from '~/helpers/index'
import ApiError from '~utils/api-error'
import utils from '../utils'

// [POST] '/categories/variations/options'
// add new variation option with categoryId and variationId
const createVariationOption = async (prisma, categoryId, variationId, data) => {
  const isExist = await utils.isVariationInCategory(
    osHelpers.toNumber(categoryId),
    osHelpers.toNumber(variationId),
  )
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Variation not found')
  }
  const createdVariationOptions = await prisma.variation.update({
    where: {
      id: osHelpers.toNumber(variationId),
    },
    data: {
      variationOptions: {
        createMany: {
          data,
        },
      },
    },
  })
  return createdVariationOptions
}

// [GET] '/categories/variations/options'
const getAllVariationOptions = async (prisma) => {
  const variationOptions = await prisma.variationOption.findMany()

  return variationOptions
}

// [GET] '/categories/variations/options/:id'
const getVariationOptionById = async (prisma, id) => {
  const opId = osHelpers.toNumber(id)

  const variationOption = await prisma.variationOption.findUnique({
    where: { id: opId },
  })
  if (!variationOption)
    throw new ApiError(httpStatus.NOT_FOUND, 'Variation option not found')

  return variationOption
}

// [PATCH] '/categories/variations/options/:id'
const updateVariationOption = async (prisma, id, value) => {
  const opId = osHelpers.toNumber(id)

  const variationOption = await prisma.variationOption.update({
    where: { id: opId },
    data: { value },
  })
  if (!variationOption)
    throw new ApiError(httpStatus.NOT_FOUND, 'Variation option not found')

  return variationOption
}

// [DELETE] '/categories/variations/options/:id'
const deleteVariationOption = async (prisma, id) => {
  const opId = osHelpers.toNumber(id)

  const variationOption = await prisma.variationOption.delete({
    where: { id: opId },
  })
  if (!variationOption)
    throw new ApiError(httpStatus.NOT_FOUND, 'Variation option not found')

  return variationOption
}

export default {
  createVariationOption,
  deleteVariationOption,
  getAllVariationOptions,
  getVariationOptionById,
  updateVariationOption,
}
