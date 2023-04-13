import * as dotenv from 'dotenv'
import osHelpers from '~/helpers/index.js'

dotenv.config()
// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

export default {
  port: osHelpers.toNumber(osHelpers.getOsEnv('SERVER_PORT')) || 5000,
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },
  // token
  tokens: {
    jwtAccessToken: osHelpers.getOsEnv('ACCESS_TOKEN_SECRET'),
    jwtRefreshToken: osHelpers.getOsEnv('REFRESH_TOKEN_SECRET'),
    jwtAccessTokenExpires: osHelpers.toNumber(
      osHelpers.getOsEnv('JWT_REFRESH_EXPIRED'),
    ),
    jwtRefreshTokenExpires: osHelpers.toNumber(
      osHelpers.getOsEnv('JWT_REFRESH_EXPIRED'),
    ),
  },
  /**
   * API configs
   */
  api: {
    prefix_v1: '/api/v1',
  },
}
