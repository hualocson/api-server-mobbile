import httpStatus from 'http-status'
import { osHelpers } from '~/helpers/index'
import ApiError from '~utils/api-error'

// [GET] /orders => Get all Orders
const getAllOrders = async (prisma, userId, role, sort) => {
  let defSort = 'desc'
  if (sort === 'asc') defSort = sort
  let orders = []
  if (role === 'ADMIN') {
    orders = await prisma.order.findMany({
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
            productItem: {
              select: {
                productImage: true,
                product: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: { createdAt: defSort },
    })
  } else {
    orders = await prisma.order.findMany({
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
            productItem: {
              select: {
                productImage: true,
                product: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: { createdAt: defSort },
    })
  }

  const result = orders.map((order) => ({
    ...order,
    orderLines: order.orderLines.map((orderLine) => ({
      id: orderLine.id,
      qty: orderLine.qty,
      productItemId: orderLine.productItemId,
      orderId: orderLine.orderId,
      price: orderLine.price,
      name: orderLine.productItem.product.name,
      img: orderLine.productItem.productImage,
    })),
  }))
  return result
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

// [GET] /orders/:id => Get Order by Id
const getOrderById = async (prisma, userId, id, role) => {
  let order
  if (role === 'ADMIN') {
    order = await prisma.order.findFirst({
      where: { id: osHelpers.toNumber(id) },
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
            productItem: {
              select: {
                productImage: true,
                product: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    })
  } else {
    order = await prisma.order.findFirst({
      where: { id: osHelpers.toNumber(id), userId: osHelpers.toNumber(userId) },
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
            productItem: {
              select: {
                productImage: true,
                product: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    })
  }

  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found')
  }

  const result = {
    ...order,
    orderLines: order.orderLines.map((orderLine) => ({
      id: orderLine.id,
      qty: orderLine.qty,
      productItemId: orderLine.productItemId,
      orderId: orderLine.orderId,
      price: orderLine.price,
      name: orderLine.productItem.product.name,
      img: orderLine.productItem.productImage,
    })),
  }
  return result
}

// [PATCH] /orders/:id/status => Update Order by Id
const updateOrderStatusById = async (prisma, id, status) => {
  if (!status)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Missing required fields')
  const validStatuses = ['PENDING', 'PROCESSING', 'DELIVERED', 'CANCELLED']
  if (!validStatuses.includes(status))
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid status')
  const order = await prisma.order.update({
    where: { id: osHelpers.toNumber(id) },
    data: { orderStatus: status },
  })

  return order
}

export default {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatusById,
}
