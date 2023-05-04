import httpStatus from 'http-status'
import { checkPassword } from '~utils/index.js'
import ApiError from '~utils/api-error.js'
import serviceUtils from '~api/services/utils.js'
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

// [POST] '/users/signup'
const createUser = async (prisma, data) => {
  const { email, password, firstName, lastName, phone, avatar } = data

  if (!email || !password || !firstName || !lastName || !phone)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Missing required fields')

  if (await serviceUtils.checkEmailExist(email))
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already exist')

  const hash = await serviceUtils.hashPassword(password)
  let user
  if (avatar) {
    user = await prisma.user.create({
      data: {
        email,
        password: hash,
        firstName,
        lastName,
        phone,
        avatar,
        cart: { create: {} },
      },
      select: { id: true, email: true },
    })
  } else {
    user = await prisma.user.create({
      data: {
        email,
        password: hash,
        firstName,
        lastName,
        phone,
        cart: { create: {} },
      },
      select: { id: true, email: true },
    })
  }

  return user
}

// [POST] '/users/email'
const checkUserEmail = async (prisma, email) => {
  const user = await userService.getUserByEmail(prisma, email)
  if (user) throw new ApiError(httpStatus.BAD_REQUEST, 'Email already exist')
  return { message: 'Email is valid' }
}

export default {
  loginUserWithEmailAndPassword,
  createUser,
  checkUserEmail,
}
