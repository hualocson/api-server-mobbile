import express from 'express'
import middlewares from '~api/middlewares'
import { cartController } from '~api/controllers'

const router = express.Router()

// [GET] '/cart/'
router.get('/', middlewares.isAuth, cartController.getShoppingCartItem)

// [POST] '/cart/'
router.post('/', middlewares.isAuth, cartController.addProductToCart)

// [PATCH] '/cart/items/:id' => id = productItemId
router.patch(
  '/items/:id',
  middlewares.isAuth,
  cartController.updateProductInCart,
)

// [DELETE] '/cart/items/:id' => id = productItemId
router.delete(
  '/items/:id',
  middlewares.isAuth,
  cartController.deleteProductInCart,
)

export default router
