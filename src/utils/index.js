import bcrypt from 'bcryptjs'

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  return hash
}

const checkEmailExist = async (prisma, email) => {
  // return true if exist
  const account = await prisma.user.findUnique({
    where: { email },
  })
  if (account) {
    return true
  }
  return false
}

const checkPassword = async (password, hash) => {
  // validPassword
  const validPassword = await bcrypt.compare(password, hash)

  return validPassword
}

export { hashPassword, checkEmailExist, checkPassword }
