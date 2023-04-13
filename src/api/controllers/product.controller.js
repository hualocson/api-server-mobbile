import { PrismaClient } from '@prisma/client'

import responseHandler from '~api/handlers/response.handler.js'
import { productService } from '~api/services/index.js'
import catchAsync from '~utils/catch-async.js'

const prisma = new PrismaClient()

// [GET] '/products'
const getProducts = catchAsync(async (req, res) => {
  const { products } = await productService.getProducts(prisma)
  responseHandler.ok(res, { products })
}, prisma)

export default { getProducts }
