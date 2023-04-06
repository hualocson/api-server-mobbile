import responseHandler from '../handlers/response.handler.js'
// [GET] '/users/'
const getListUserService = async () => {
  const message = 'Get All users'

  return { message }
}

// [POST] '/users/signup'
const createUserService = async () => {}

// [POST] '/users/signup'
const signInService = async () => {}
export { getListUserService, createUserService, signInService }
