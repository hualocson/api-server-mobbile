import httpStatus from 'http-status'
import { hashPassword, checkEmailExist } from '~utils/index.js'
import ApiError from '~utils/api-error.js'

// [GET] '/users/'
const getListUser = async (prisma) => {
  const allUsers = await prisma.user.findMany()

  return { allUsers }
}

// [POST] '/users/signup'
const createUser = async (prisma, data) => {
  const { email, password, firstName, lastName, phone, avatar } = data

  if (await checkEmailExist(prisma, email))
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already exist')

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

  return user
}

const getUserByEmail = async (prisma, email) => {
  const user = await prisma.user.findUnique({
    where: { email },
  })
  return user
}

export default { getListUser, createUser, getUserByEmail }
