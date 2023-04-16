import httpStatus from 'http-status'
import { osHelpers } from '~/helpers/index'
import ApiError from '~utils/api-error'
import utils from '../utils'

// [POST] '/categories/variations/options'
const createVariationOption = async (prisma, id, value) => {
  const variationId = osHelpers.toNumber(id)

  const isExist = await utils.isVariationExists(variationId)
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Variation not found')
  }

  const variationOption = await prisma.variationOption.create({
    data: {
      value,
      variation: {
        connect: {
          id: variationId,
        },
      },
    },
  })
  return variationOption
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
