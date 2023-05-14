import express from 'express'
import middlewares from '~api/middlewares'
import { orderController } from '~/api/controllers'

const router = express.Router()

// [GET] '/orders/:id' => Get order by id
router.get('/:id', middlewares.isAuth, orderController.getOrderById)

router.get('/', middlewares.isAuth, orderController.getAllShippings)

router.post('/', middlewares.isAuth, orderController.createOrder)

// [PATCH] '/orders/:id/status' => Update order by id
router.patch(
  '/:id/status',
  middlewares.isAdmin,
  orderController.updateOrderById,
)

export default router
