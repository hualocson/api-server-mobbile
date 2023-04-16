import responseHandler from '~api/handlers/response.handler.js'
import catchAsync from '~utils/catch-async.js'
import prisma from '~configs/prisma.client'
import { userService, authService, tokenService } from '~api/services/index.js'

// [GET] '/users/'
const getAllUser = catchAsync(async (req, res) => {
  const { allUsers } = await userService.getListUser(prisma)
  responseHandler.ok(res, { users: allUsers })
}, prisma)

// [POST] '/users/signup'
const signUp = catchAsync(async (req, res) => {
  const data = req.body
  const user = await userService.createUser(prisma, data)
  responseHandler.created(res, user)
}, prisma)

// [POST] '/users/signIn'
const signIn = catchAsync(async (req, res) => {
  const { email, password } = req.body
  const user = await authService.loginUserWithEmailAndPassword(
    prisma,
    email,
    password,
  )
  const tokens = await tokenService.generateAuthTokens(user)
  responseHandler.ok(res, tokens)
}, prisma)

export default { getAllUser, signUp, signIn }
