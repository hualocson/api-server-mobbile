import httpStatus from 'http-status'
import ApiError from '~utils/api-error.js'
import { Prisma } from '@prisma/client'
import responseHandler from '~api/handlers/response.handler.js'

const errorConverter = (err, req, res, next) => {
  let error = err
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof Prisma.PrismaClientKnownRequestError
        ? httpStatus.BAD_REQUEST
        : httpStatus.INTERNAL_SERVER_ERROR
    const message = error.message || httpStatus[statusCode]
    error = new ApiError(statusCode, message, false, error.stack)
  }
  next(error)
}

const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err
  if (process.env.NODE_ENV === 'production' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR
    message = httpStatus[statusCode]
  }
  res.locals.errorMessage = err.message
  const error = new ApiError(statusCode, message, err.isOperational, err.stack)
  responseHandler.error(res, error)
}

export { errorConverter, errorHandler }
