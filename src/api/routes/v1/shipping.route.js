import express from 'express'
import middlewares from '~api/middlewares'
import { shippingController } from '~api/controllers'

const router = express.Router()

router.get('/', shippingController.getAllShippings)

router.post('/', middlewares.isAdmin, shippingController.createShipping)

router.patch('/:id', middlewares.isAdmin, shippingController.updateShipping)

router.delete('/:id', middlewares.isAdmin, shippingController.deleteShipping)

export default router
