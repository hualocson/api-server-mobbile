import express from 'express'
import { shippingController } from '~api/controllers'

const router = express.Router()

router.get('/', shippingController.getAllShippings)

router.post('/', shippingController.createShipping)

router.patch('/:id', shippingController.updateShipping)

router.delete('/:id', shippingController.deleteShipping)

export default router
