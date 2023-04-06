import express from 'express'
import cors from 'cors'
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
}
