import ApiError from '~/utils/api-error'
import httpStatus from 'http-status'

// [GET] '/users/'
const getListUser = async (prisma) => {
  const allUsers = await prisma.user.findMany()

  return { allUsers }
}

const getUserByEmail = async (prisma, email) => {
  const user = await prisma.user.findUnique({
    where: { email },
  })
  return user
}

// [GET] '/users/profile'
const getUserProfile = async (prisma, userId) => {
  if (!userId) throw new ApiError(httpStatus.BAD_REQUEST, 'User id is required')
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      email: true,
      firstName: true,
      lastName: true,
      phone: true,
      avatar: true,
    },
  })
  return user
}

export default { getListUser, getUserByEmail, getUserProfile }
