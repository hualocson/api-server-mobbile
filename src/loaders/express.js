import express from 'express'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import fs from 'fs'
import path from 'path'
import { errorConverter, errorHandler } from '~middlewares/error.js'
import osHelpers from '~/helpers/index.js'
import configs from '../configs/index.js'
import routes from '../api/routes/v1/index.js'

export default (app) => {
  app.get('/status', (req, res) => {
    res.status(200).end()
  })
  app.head('/status', (req, res) => {
    res.status(200).end()
  })

  app.enable('trust proxy')

  app.use(cors())

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  // Load API routes
  app.use(configs.api.prefix_v1, routes)

  const swaggerFile = JSON.parse(
    fs.readFileSync(
      path.join(osHelpers.getRootPath(), 'swagger_output.json'),
      'utf8',
    ),
  )
  app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

  app.use(errorConverter)
  app.use(errorHandler)
}
