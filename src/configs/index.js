import * as dotenv from 'dotenv'

dotenv.config()

export default {
  port: process.env.SERVER_PORT || 5000,
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },
}
