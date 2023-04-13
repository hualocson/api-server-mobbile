import express from 'express'
import { productController } from '~api/controllers/index.js'

const router = express.Router()

// get all products
router.get('/', productController.getProducts)

export default router
