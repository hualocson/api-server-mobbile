import responseHandler from '~api/handlers/response.handler.js'
import catchAsync from '~utils/catch-async.js'
import prisma from '~configs/prisma.client'
import { orderService } from '~api/services'

// [GET] '/orders' => Get all shippings
const getAllShippings = catchAsync(async (req, res) => {
  const { id } = req.payload.sub
  const orders = await orderService.getAllOrders(prisma, id)
  responseHandler.ok(res, orders)
}, prisma)

// [POST] '/orders' => Create new order
const createOrder = catchAsync(async (req, res) => {
  const { id } = req.payload.sub
  const order = await orderService.createOrder(prisma, id, req.body)
  responseHandler.created(res, order)
}, prisma)

// [GET] '/orders/:id' => Get order by id
const getOrderById = catchAsync(async (req, res) => {
  const { id } = req.params
  const user = req.payload.sub
  const order = await orderService.getOrderById(prisma, user.id, id)
  responseHandler.ok(res, order)
}, prisma)

// [PATCH] '/orders/:id/status' => Update order by id
const updateOrderById = catchAsync(async (req, res) => {
  const { id } = req.params
  const { status } = req.body
  const order = await orderService.updateOrderStatusById(prisma, id, status)
  responseHandler.ok(res, order)
}, prisma)

export default {
  getAllShippings,
  getOrderById,
  createOrder,
  updateOrderById,
}
