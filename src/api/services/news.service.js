import httpStatus from 'http-status'
import ApiError from '~utils/api-error'

// [POST] /api/news
const createNews = async (prisma, data) => {
  const { title, content, author, imageUrl } = data
  if (!title || !content || !author || !imageUrl) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Missing required fields')
  }

  const news = await prisma.news.create({
    data: {
      title,
      content,
      author,
      imageUrl,
    },
  })

  if (!news)
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Cannot create news')
  return news
}

// [GET] /api/news
const getNews = async (prisma) => {
  const news = await prisma.news.findMany()
  if (!news) throw new ApiError(httpStatus.NOT_FOUND, 'News not found')
  return news
}

export default {
  createNews,
  getNews,
}
