import responseHandler from '../handlers/response.handler.js'
import { getListUser } from '../services/user.service.js'

// [GET] '/users/:id'
const getAllUser = async (req, res) => {
  try {
    const { message } = await getListUser()
    responseHandler.ok(res, { message })
  } catch (error) {
    responseHandler.error(res, error)
  }
}

export { getAllUser }
