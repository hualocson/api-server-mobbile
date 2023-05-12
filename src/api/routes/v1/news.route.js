import express from 'express'
import { newsController } from '~/api/controllers'

const router = express.Router()

router.get('/', newsController.getNews)

router.post('/', newsController.createNews)

export default router
