import responseHandler from '~api/handlers/response.handler.js'
import catchAsync from '~utils/catch-async.js'
import prisma from '~configs/prisma.client'
import { orderService } from '~api/services'

// [GET] '/orders' => Get all order
const getAllOrders = catchAsync(async (req, res) => {
  const { id, role } = req.payload.sub
  const { sort } = req.query
  const orders = await orderService.getAllOrders(prisma, id, role, sort)
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
  const order = await orderService.getOrderById(prisma, user.id, id, user.role)
  responseHandler.ok(res, order)
}, prisma)

// [GET] '/orders/:userId' => Get order by id
const getOrderByUserId = catchAsync(async (req, res) => {
  const { userId } = req.params
  const { sort } = req.query
  const order = await orderService.getOrderByUserId(prisma, userId, sort)
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
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderById,
  getOrderByUserId,
}
