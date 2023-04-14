import express from 'express'
import swaggerUi from 'swagger-ui-express'
import docs, { options } from '~api/docs/index.js'

const router = express.Router()

router.use('/', swaggerUi.serve, swaggerUi.setup(docs, options))

export default router
