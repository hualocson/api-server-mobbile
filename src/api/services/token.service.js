import moment from 'moment'
import httpStatus from 'http-status'
import jwt from 'jsonwebtoken'
import tokenTypes from '~/configs/tokens.js'
import configs from '~/configs'
import ApiError from '~/utils/api-error'

const generateToken = async (
  user,
  expires,
  type,
  secret = configs.tokens.jwtAccessToken,
) => {
  const payload = {
    sub: { id: user.id, role: user.role },
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  }

  return jwt.sign(payload, secret)
}

const generateAuthTokens = async (user) => {
  const accessTokenExpires = moment().add(
    configs.tokens.jwtAccessTokenExpires / 60,
    'minutes',
  )
  const accessToken = await generateToken(
    user,
    accessTokenExpires,
    tokenTypes.ACCESS,
  )

  const refreshTokenExpires = moment().add(
    configs.tokens.jwtRefreshTokenExpires / 60,
    'minutes',
  )
  const refreshToken = await generateToken(
    user,
    refreshTokenExpires,
    tokenTypes.REFRESH,
    configs.tokens.jwtRefreshToken,
  )

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  }
}

const verifyToken = (token, secret = configs.tokens.jwtAccessToken) => {
  try {
    const decoded = jwt.verify(token, secret)
    return decoded
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid token')
  }
}
export default { generateToken, generateAuthTokens, verifyToken }
