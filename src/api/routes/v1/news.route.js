import express from 'express'
import middlewares from '~/api/middlewares'
import { newsController } from '~/api/controllers'

const router = express.Router()

router.get('/', middlewares.isAdmin, newsController.getNews)

router.post('/', middlewares.isAdmin, newsController.createNews)

// [PATCH] /api/news/:id
router.patch('/:id', middlewares.isAdmin, newsController.updateNews)

// [DELETE] /api/news/:id
router.delete('/:id', middlewares.isAdmin, newsController.deleteNews)

export default router
