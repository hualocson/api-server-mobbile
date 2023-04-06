import expressLoader from './express.js'
import logger from './logger.js'

export default async (app) => {
  await expressLoader(app)
  logger.info('✌️ Express loaded')
}
