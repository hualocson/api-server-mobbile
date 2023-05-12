import httpStatus from 'http-status'
import { osHelpers } from '~/helpers/index'
import ApiError from '~utils/api-error'

// [GET] /orders => Get all Orders
const getAllOrders = async (prisma, userId) => {
  const orders = await prisma.order.findMany({
    where: { userId: osHelpers.toNumber(userId) },
    select: {
      id: true,
      orderTotal: true,
      shippingMethodId: true,
      shippingAddressId: true,
      orderStatus: true,
      orderLines: {
        select: {
          id: true,
          qty: true,
          productItemId: true,
          orderId: true,
          price: true,
        },
      },
    },
  })

  return orders
}

// [POST] /orders => Create new Order
const createOrder = async (prisma, userId, data) => {
  const { orderTotal, shippingMethodId, shippingAddressId, orderLines } = data
  if (!orderTotal || !shippingMethodId || !shippingAddressId || !orderLines) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Missing required fields')
  }
  const orderLineData = orderLines.map((orderLine) => ({
    productItem: {
      connect: { id: osHelpers.toNumber(orderLine.productItemId) },
    },
    qty: osHelpers.toNumber(orderLine.qty),
    price: osHelpers.toNumber(orderLine.price),
  }))

  const order = await prisma.order.create({
    data: {
      user: { connect: { id: osHelpers.toNumber(userId) } },
      orderTotal: osHelpers.toNumber(orderTotal),
      shippingMethod: { connect: { id: osHelpers.toNumber(shippingMethodId) } },
      shippingAddress: {
        connect: { id: osHelpers.toNumber(shippingAddressId) },
      },
      orderLines: {
        create: orderLineData,
      },
    },
    select: {
      id: true,
      orderTotal: true,
      shippingMethodId: true,
      shippingAddressId: true,
      orderStatus: true,
      orderLines: {
        select: {
          id: true,
          qty: true,
          productItemId: true,
          orderId: true,
          price: true,
        },
      },
    },
  })

  return order
}

export default {
  createOrder,
  getAllOrders,
}
