import * as dotenv from 'dotenv'
import { osHelpers } from '~/helpers/index.js'

dotenv.config()
// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

export default {
  port: osHelpers.toNumber(osHelpers.getOsEnv('SERVER_PORT')) || 5000,
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
  isDevelopment: process.env.NODE_ENV === 'development',
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

  // cloudinary
  cloudinary: {
    cloud_name: osHelpers.getOsEnv('CLOUDINARY_CLOUD_NAME'),
    api_key: osHelpers.getOsEnv('CLOUDINARY_API_KEY'),
    api_secret: osHelpers.getOsEnv('CLOUDINARY_API_SECRET'),
  },
  /**
   * API configs
   */
  api: {
    prefix_v1: '/api/v1',
  },
}
