import * as dotenv from 'dotenv'

dotenv.config()
// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

export default {
  port: process.env.SERVER_PORT || 5000,
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },
  /**
   * API configs
   */
  api: {
    prefix_v1: '/api/v1',
  },
}
