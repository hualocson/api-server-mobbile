import httpStatus from 'http-status'
import ApiError from '~utils/api-error'

// [GET] '/products'
const getProducts = async (prisma) => {
  const products = await prisma.product.findMany()
  return { products }
}

export default {
  getProducts,
}
