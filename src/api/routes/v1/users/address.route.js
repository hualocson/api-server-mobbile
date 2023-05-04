import express from 'express'
import middlewares from '~api/middlewares'
import { userController } from '~api/controllers/index.js'

const router = express.Router()

router.get('/', middlewares.isAuth, userController.getAllAddress)

router.post('/', middlewares.isAuth, userController.createAddress)

router.patch('/:addressId', middlewares.isAuth, userController.updateAddress)

router.delete('/:addressId', middlewares.isAuth, userController.deleteAddress)

export default router
