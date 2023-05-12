import httpStatus from 'http-status'
import { osHelpers } from '~/helpers/index'
import ApiError from '~utils/api-error'
import cloudinaryService from './cloudinary.service'

// [GET] '/shippings' => Get all shippings
const getAllShippings = async (prisma) => {
  const shippings = await prisma.shippingMethod.findMany()

  return shippings
}

// [POST] '/shippings' => Create new shipping
const createShipping = async (prisma, name, price, desc, icon) => {
  if (!name || !price || !desc || !icon)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Missing required fields')

  const iconUrl = await cloudinaryService.uploadImage(
    icon,
    '/mobileapp/shipping',
    `${name}-icon`,
  )

  if (!iconUrl)
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Upload icon failed')

  const shipping = await prisma.shippingMethod.create({
    data: {
      name,
      price: osHelpers.toNumber(price),
      description: desc,
      iconUrl,
    },
  })

  if (!shipping)
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Create shipping failed',
    )

  return shipping
}

// [PATCH] '/shippings/:id' => Update shipping
const updateShipping = async (prisma, shippingId, data) => {
  const { name, price, desc } = data
  if (!name && !price && !desc)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Missing required fields')

  const shipping = await prisma.shippingMethod.findUnique({
    where: { id: osHelpers.toNumber(shippingId) },
  })

  if (!shipping) throw new ApiError(httpStatus.NOT_FOUND, 'Shipping not found')

  const updatedShipping = await prisma.shippingMethod.update({
    where: { id: osHelpers.toNumber(shippingId) },
    data: {
      name: name || shipping.name,
      price: osHelpers.toNumber(price) || shipping.price,
      description: desc || shipping.description,
    },
  })

  if (!updatedShipping)
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Update shipping failed',
    )

  return updatedShipping
}

// [DELETE] '/shippings/:id' => Delete shipping
const deleteShipping = async (prisma, shippingId) => {
  const shipping = await prisma.shippingMethod.findUnique({
    where: { id: osHelpers.toNumber(shippingId) },
  })

  if (!shipping) throw new ApiError(httpStatus.NOT_FOUND, 'Shipping not found')

  const deletedShipping = await prisma.shippingMethod.delete({
    where: { id: osHelpers.toNumber(shippingId) },
  })

  if (!deletedShipping)
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Delete shipping failed',
    )

  return deletedShipping
}

export default {
  getAllShippings,
  createShipping,
  updateShipping,
  deleteShipping,
}
