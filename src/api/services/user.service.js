import responseHandler from '../handlers/response.handler.js'
// [GET] '/users/'
const getListUser = async () => {
  const message = 'Get All users'

  return { message }
}

export { getListUser }
