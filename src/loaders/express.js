import cors from 'cors'
import bodyParser from 'body-parser'
import { errorConverter, errorHandler } from '~middlewares/error.js'
import configs from '../configs/index.js'
import routes from '../api/routes/v1/index.js'

export default (app) => {
  app.get('/status', (req, res) => {
    res.status(200).end()
  })
  app.head('/status', (req, res) => {
    res.status(200).end()
  })

  app.get('/', (req, res) => {
    res
      .status(200)
      .send('<h1><a href="/api/v1/docs">Go to API Documents</a></h1>')
  })

  app.enable('trust proxy')

  app.use(cors())

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  // Load API routes
  app.use(configs.api.prefix_v1, routes)

  app.use(errorConverter)
  app.use(errorHandler)
}
