import express from 'express'
import variationRoute from './variation.route'
import variationOptionRoute from './variationOption.route'

const router = express.Router()

router.use('/options', variationOptionRoute)

// 'categories/variations'
router.use('/', variationRoute)

export default router
