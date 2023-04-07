import httpStatus from 'http-status'
import userService from './user.service.js'
import { checkPassword } from '~utils/index.js'
import ApiError from '~utils/api-error.js'

// [POST] '/users/signin'
const loginUserWithEmailAndPassword = async (prisma, email, password) => {
  const user = await userService.getUserByEmail(prisma, email)

  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password')
  } else {
    const validPassword = await checkPassword(password, user.password)
    if (!validPassword) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password')
    }
  }
  return user
}

export default {
  loginUserWithEmailAndPassword,
}
