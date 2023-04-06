import responseHandler from '../handlers/response.handler.js'
import { getListUserService } from '../services/user.service.js'

// [GET] '/users/'
const getAllUser = async (req, res) => {
  try {
    const { message } = await getListUserService()
    responseHandler.ok(res, { message })
  } catch (error) {
    responseHandler.error(res, error)
  }
}

// [POST] '/users/signup'
const signUp = async (req, res) => {}

// [POST] '/users/signIn'
const signIn = async (req, res) => {}

export { getAllUser, signUp, signIn }
