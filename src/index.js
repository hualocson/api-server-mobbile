import http from 'http'
import startApp from '~/app.js'
import configs from '~configs/index.js'
import logger from '~loaders/logger.js'

startApp()
  .then((app) => {
    const server = http.createServer(app)
    server
      .listen(configs.port, () => {
        logger.info(`
      #############################################
        Server listening on: http://localhost:${configs.port}
      #############################################`)
      })
      .on('error', (err) => {
        logger.error(err)
        process.exit(1)
      })
  })
  .catch((err) => {
    logger.error(err)
    process.exit(1)
  })
