import express from 'express'
import variationRoute from './variation.route'

const router = express.Router()

router.use('/', variationRoute)

export default router
