import { PrismaClient } from '@prisma/client'

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

export default {
  isVariationExists,
}
