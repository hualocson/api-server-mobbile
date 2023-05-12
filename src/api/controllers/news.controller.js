import responseHandler from '~api/handlers/response.handler.js'
import catchAsync from '~utils/catch-async.js'
import prisma from '~configs/prisma.client'
import { newsService } from '~api/services'

const createNews = catchAsync(async (req, res) => {
  const news = await newsService.createNews(prisma, req.body)
  responseHandler.created(res, news)
}, prisma)

const getNews = catchAsync(async (req, res) => {
  const news = await newsService.getNews(prisma)
  responseHandler.ok(res, news)
}, prisma)

export default {
  createNews,
  getNews,
}
