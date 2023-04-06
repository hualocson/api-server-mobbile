import { Router } from 'express'
import userRoute from './user.route.js'

const router = Router()

router.use('/users', userRoute)
router.get((req, res) => {
  res.send('api')
})

export default router
