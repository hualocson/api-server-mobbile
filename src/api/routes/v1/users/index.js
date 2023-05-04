import express from 'express'
import userRoute from './user.route'
import addressRoute from './address.route'

const router = express.Router()

router.use('/addresses', addressRoute)

router.use('/', userRoute)

export default router
