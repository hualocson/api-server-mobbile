import responseHandler from '~api/handlers/response.handler.js'
import catchAsync from '~utils/catch-async.js'
import prisma from '~configs/prisma.client'
import { cartService } from '~api/services'

// [GET] '/cart/'
const getShoppingCartItem = catchAsync(async (req, res) => {
  const { id } = req.payload.sub
  const { flag } = req.query

  const cart = await cartService.getShoppingCartItem(prisma, id, flag)

  responseHandler.ok(res, { cart })
}, prisma)

// [POST] '/cart/'
const addProductToCart = catchAsync(async (req, res) => {
  const { productItemId, quantity } = req.body
  const data = { userId: req.payload.sub.id, productItemId, quantity }

  const cart = await cartService.createCart(prisma, data)

  responseHandler.ok(res, { cart })
}, prisma)

// [PATCH] '/cart/items/:id' => id = productItemId
const updateProductInCart = catchAsync(async (req, res) => {
  const { id } = req.params
  const { quantity } = req.body
  const data = { userId: req.payload.sub.id, productItemId: id, quantity }

  const updatedItem = await cartService.updateCartItem(prisma, data)

  responseHandler.ok(res, { updatedItem })
}, prisma)

// [DELETE] '/cart/items/:id' => id = productItemId
const deleteProductInCart = catchAsync(async (req, res) => {
  const { id } = req.params
  const data = { userId: req.payload.sub.id, productItemId: id }

  const deletedItem = await cartService.removeItemInShoppingCart(prisma, data)

  responseHandler.ok(res, { deletedItem })
}, prisma)

export default {
  addProductToCart,
  deleteProductInCart,
  getShoppingCartItem,
  updateProductInCart,
}
