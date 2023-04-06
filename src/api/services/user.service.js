import {
  hashPassword,
  checkEmailExist,
  getUserByEmail,
  checkPassword,
} from '../utils/index.js'
import MyError from '../utils/error.js'

// [GET] '/users/'
const getListUserService = async (prisma) => {
  const allUsers = await prisma.user.findMany()

  return { allUsers }
}

// [POST] '/users/signup'
const createUserService = async (prisma, data) => {
  const { email, password, firstName, lastName, phone, avatar } = data

  if (await checkEmailExist(prisma, email))
    return Promise.reject(new MyError('Email already exists', 400))
  const hash = await hashPassword(password)
  const user = await prisma.user.create({
    data: {
      email,
      password: hash,
      firstName,
      lastName,
      phone,
      avatar,
    },
  })

  return Promise.resolve(user)
}

// [POST] '/users/signin'
const signInService = async (prisma, data) => {
  const { email, password } = data
  console.log({ email, password })
  const isExist = await checkEmailExist(prisma, email)
  if (!isExist) return Promise.reject(new MyError('Email is invalid', 400))

  const user = await getUserByEmail(prisma, email)

  const validPassword = await checkPassword(password, user.password)
  if (!validPassword)
    return Promise.reject(new MyError('Password is invalid', 400))

  return Promise.resolve(user)
}
export { getListUserService, createUserService, signInService }
