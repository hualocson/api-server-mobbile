import * as dotenv from 'dotenv'

dotenv.config()

export default {
  port: process.env.SERVER_PORT || 5000,
}
