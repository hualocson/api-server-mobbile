import express from 'express'
import middlewares from '~api/middlewares'
import { orderController } from '~/api/controllers'

const router = express.Router()

router.get('/', middlewares.isAuth, orderController.getAllShippings)

router.post('/', middlewares.isAuth, orderController.createOrder)

export default router
