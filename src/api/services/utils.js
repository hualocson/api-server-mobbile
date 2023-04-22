import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'


const prisma = new PrismaClient()
// #region variation utils
const isVariationExists = async (id) => {
  try {
    const variation = await prisma.variation.findUnique({
      where: { id },
    })
    if (variation) return true
    return false
  } catch (error) {
    return false
  }
}
// #endregion

const aggregateProductItemPrice = (productId) => {
  return prisma.productItem.aggregate({
    _avg: {
      price: true,
    },
    _max: {
      price: true,
    },
    _min: {
      price: true,
    },
    where: {
      productId,
    },
  })
}

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  return hash
}

const checkEmailExist = async (email) => {
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

export default {
  isVariationExists,
  aggregateProductItemPrice,
  hashPassword,
  checkEmailExist,
  checkPassword,
}
