/* Format for response
{
    "success": true or false,
    "data": {}
    "message": "This is message for response",
    "statusCode": 200 or 404 or 500,
}
1. Success:
{
    "success": true,
    "data": {
        //Some data for success
    },
    message: "This is message for success response",
    "statusCode": 200 or 201
}
2. Failure
{
    "success": false,
    "data": {},
    "message": "This is error",
    "statusCode": 404 or 500
}
*/
import httpStatus from 'http-status'

const responseWithData = (res, statusCode, data) =>
  res.status(statusCode).json(data)

const badRequest = (res, err) =>
  responseWithData(res, 400, {
    success: false,
    data: {
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    },
    message: err.message,
    statusCode: 400,
  })

const notFound = (res, err) =>
  responseWithData(res, 404, {
    success: false,
    data: {
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    },
    message: err.message,
    statusCode: 404,
  })

const ok = (res, data) =>
  responseWithData(res, 200, {
    success: true,
    data,
    message: 'Request successful!',
    statusCode: 200,
  })

const created = (res, data) =>
  responseWithData(res, 201, {
    success: true,
    data,
    message: 'Create successful!',
    statusCode: 201,
  })

const error = (res, err) => {
  switch (err.statusCode) {
    case httpStatus.NOT_FOUND:
      notFound(res, err)
      break
    case httpStatus.BAD_REQUEST:
      badRequest(res, err)
      break
    case httpStatus.UNAUTHORIZED:
      responseWithData(res, 401, {
        success: false,
        data: {
          ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
        },
        message: 'Unauthorized!',
        statusCode: 401,
      })
      break
    default:
      responseWithData(res, 500, {
        success: false,
        data: {
          ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
        },
        message: 'Server get error!',
        statusCode: 500,
      })
      break
  }
}

export default {
  error,
  badRequest,
  created,
  notFound,
  ok,
}
