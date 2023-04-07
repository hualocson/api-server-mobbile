const catchAsync = (fn, prisma) => (req, res, next) => {
  Promise.resolve(fn(req, res, next))
    .catch((err) => next(err))
    .finally(async () => {
      await prisma.$disconnect()
    })
}

export default catchAsync
