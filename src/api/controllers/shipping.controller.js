import responseHandler from '~api/handlers/response.handler.js'
import catchAsync from '~utils/catch-async.js'
import prisma from '~configs/prisma.client'
import { shippingService } from '~api/services'

// [GET] '/shippings' => Get all shippings
const getAllShippings = catchAsync(async (req, res) => {
  const shippings = await shippingService.getAllShippings(prisma)
  responseHandler.ok(res, shippings)
}, prisma)

// [POST] '/shippings' => Create new shipping
const createShipping = catchAsync(async (req, res) => {
  const { name, price, desc, icon } = req.body
  const shipping = await shippingService.createShipping(
    prisma,
    name,
    price,
    desc,
    icon,
  )
  responseHandler.created(res, shipping)
}, prisma)

// [PATCH] '/shippings/:id' => Update shipping
const updateShipping = catchAsync(async (req, res) => {
  const { id } = req.params
  const shipping = await shippingService.updateShipping(prisma, id, req.body)
  responseHandler.ok(res, shipping)
}, prisma)

// [DELETE] '/shippings/:id' => Delete shipping
const deleteShipping = catchAsync(async (req, res) => {
  const { id } = req.params
  await shippingService.deleteShipping(prisma, id)
  responseHandler.ok(res, shippingService)
}, prisma)

export default {
  createShipping,
  getAllShippings,
  updateShipping,
  deleteShipping,
}
