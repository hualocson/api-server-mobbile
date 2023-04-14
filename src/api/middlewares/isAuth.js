import ApiError from '~utils/api-error'
import { tokenService } from '~api/services'
import httpStatus from 'http-status'

const getTokenFromHeaders = (req) => {
  if (
    (req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Token') ||
    (req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Bearer')
  ) {
    return req.headers.authorization.split(' ')[1]
  }
  return null
}

const isAuth = (req, res, next) => {
  const token = getTokenFromHeaders(req)
  if (!token) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "You're not authorized")
  }
  const decoded = tokenService.verifyToken(token)
  req.payload = decoded
  next()
}

export default isAuth
