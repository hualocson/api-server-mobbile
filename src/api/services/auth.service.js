import httpStatus from 'http-status'
import { checkPassword } from '~utils/index.js'
import ApiError from '~utils/api-error.js'
import userService from './user.service.js'

// [POST] '/users/signin'
const loginUserWithEmailAndPassword = async (prisma, email, password) => {
  const user = await userService.getUserByEmail(prisma, email)

  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Incorrect email or password')
  } else {
    const validPassword = await checkPassword(password, user.password)
    if (!validPassword) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Incorrect email or password')
    }
  }
  return user
}

export default {
  loginUserWithEmailAndPassword,
}
