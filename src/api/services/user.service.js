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

export default { getListUser, getUserByEmail }
