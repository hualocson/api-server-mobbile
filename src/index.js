import http from 'http'
import startApp from '~/app.js'
import configs from '~configs/index.js'
import prisma from '~/configs/prisma.client.js'
import logger from '~loaders/logger.js'

startApp()
  .then((app) => {
    prisma
      .$connect()
      .then(() => {
        logger.info('✌️ DB Connect Success')
      })
      .catch((err) => {
        logger.error(`DB: ${err}`)
      })

    const server = http.createServer(app)
    server
      .listen(configs.port, () => {
        if (configs.isDevelopment) {
          logger.info(`
        #############################################
          Server listening on: http://localhost:${configs.port}
        #############################################`)
        } else if (configs.isProduction) {
          logger.info(`
        ###################
          Server Started
        ###################`)
        } else {
          logger.info(`
        #############################################
          TestMode:
          Server listening on: http://localhost:${configs.port}
        #############################################`)
        }
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
