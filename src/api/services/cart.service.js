import httpStatus from 'http-status'
import { osHelpers } from '~helpers/index.js'
import ApiError from '~utils/api-error'
import utils from './utils'

// [POST] '/cart'
// Creates or updates a cart with the specified product ID and quantity. => add to cart
const createCart = async (prisma, data) => {
  const { userId, productItemId, quantity } = data

  if (!userId || !productItemId || !quantity || quantity < 1)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Missing required fields')

  const isProductItemExist = await utils.checkProductItemExist(productItemId)
  if (!isProductItemExist)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Product item not found')

  let cart = await prisma.shoppingCart.findFirst({
    where: { userId },
    include: { shoppingCartItems: true },
  })

  if (!cart) {
    cart = await prisma.ShoppingCart.create({
      data: {
        userId,
        shoppingCartItems: {
          create: [{ productItemId, qty: quantity }],
        },
      },
      include: { shoppingCartItems: true },
    })
    if (!cart) throw new ApiError(httpStatus.BAD_REQUEST, 'Create cart failed')
  } else {
    const item = cart.shoppingCartItems.find(
      (i) => i.productItemId === osHelpers.toNumber(productItemId),
    )

    if (item) {
      await prisma.ShoppingCartItem.update({
        where: { id: item.id },
        data: { qty: item.qty + quantity },
      })
    } else {
      await prisma.shoppingCartItem.create({
        data: { productItemId, qty: quantity, shoppingCartId: cart.id },
      })
    }

    cart = await prisma.ShoppingCart.findFirst({
      where: { userId },
      include: { shoppingCartItems: true },
    })
  }
  return cart
}

// [GET] '/cart'
// params: userId from jwt decode, flag: "create" or "update"
// Retrieves the current user's cart.
const getShoppingCartItem = async (prisma, userId, flag) => {
  if (!userId)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Missing required fields')

  // default orderByFlag is 'createdAt'
  const orderByFlag = flag === 'update' ? 'updatedAt' : 'createdAt'

  const userCart = await prisma.ShoppingCart.findFirst({
    where: { userId },
    include: { shoppingCartItems: { orderBy: { [orderByFlag]: 'asc' } } },
  })
  return userCart
}

// [PATCH] '/cart/items/:id'
// params: { userId, quantity, productItemId }
// Updates the specified cart item's quantity.
const updateCartItem = async (prisma, data) => {
  const { userId, productItemId, quantity } = data

  if (!userId || !productItemId || !quantity || quantity < 1)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Missing required fields or quantity < 1',
    )

  const shoppingCartItems = await prisma.shoppingCartItem.findMany({
    where: { shoppingCart: { userId: osHelpers.toNumber(userId) } },
  })

  const item = shoppingCartItems.find(
    (i) => i.productItemId === osHelpers.toNumber(productItemId),
  )

  if (!item)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Item not found in cart')

  const updatedShoppingCartItem = await prisma.ShoppingCartItem.update({
    where: { id: item.id },
    data: { qty: quantity },
  })
  return updatedShoppingCartItem
}

// [DELETE] '/cart/items/:id'
// params: { userId, productItemId }
// Removes the specified cart item.
const removeItemInShoppingCart = async (prisma, data) => {
  const { userId, productItemId } = data

  if (!userId || !productItemId)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Missing required fields')

  const shoppingCartItems = await prisma.shoppingCartItem.findMany({
    where: { shoppingCart: { userId: osHelpers.toNumber(userId) } },
  })
  const item = shoppingCartItems.find(
    (i) => i.productItemId === osHelpers.toNumber(productItemId),
  )

  if (!item)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Item not found in cart')

  const removedShoppingCartItem = await prisma.ShoppingCartItem.delete({
    where: { id: item.id },
  })
  return removedShoppingCartItem
}

export default {
  createCart,
  getShoppingCartItem,
  updateCartItem,
  removeItemInShoppingCart,
}
