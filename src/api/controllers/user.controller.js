import responseHandler from '~api/handlers/response.handler.js'
import catchAsync from '~utils/catch-async.js'
import prisma from '~configs/prisma.client'
import { userService, authService, tokenService } from '~api/services/index.js'

// [GET] '/users/'
const getAllUser = catchAsync(async (req, res) => {
  const { allUsers } = await userService.getListUser(prisma)
  responseHandler.ok(res, allUsers)
}, prisma)

// [POST] '/users/signup'
const signUp = catchAsync(async (req, res) => {
  const data = req.body
  const user = await authService.createUser(prisma, data)
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

// [POST] '/users/email'
const checkUserEmail = catchAsync(async (req, res) => {
  const { email } = req.body
  const message = await authService.checkUserEmail(prisma, email)
  responseHandler.ok(res, message)
}, prisma)

// [GET] '/users/profile'
const getUserProfile = catchAsync(async (req, res) => {
  const { id } = req.payload.sub
  const user = await userService.getUserProfile(prisma, id)
  responseHandler.ok(res, user)
}, prisma)

// [PATCH] '/users' => Update user
const updateUser = catchAsync(async (req, res) => {
  const { id } = req.payload.sub
  const data = req.body
  const user = await userService.updateUser(prisma, id, data)
  responseHandler.ok(res, user)
}, prisma)

// [PATCH] '/users/password' => Update user password
const updateUserPassword = catchAsync(async (req, res) => {
  const { id } = req.payload.sub
  const { oldPassword, newPassword } = req.body
  const user = await userService.updateUserPassword(
    prisma,
    id,
    oldPassword,
    newPassword,
  )
  responseHandler.ok(res, user)
}, prisma)

// [PATCH] '/users/avatar' => Update user avatar
const updateUserAvatar = catchAsync(async (req, res) => {
  const { id } = req.payload.sub
  const avatarPath = req.file.path
  const updatedUser = await userService.updateUserAvatar(prisma, id, avatarPath)
  responseHandler.ok(res, updatedUser)
}, prisma)

// #region address
// [GET] '/users/addresses'
const getAllAddress = catchAsync(async (req, res) => {
  const { id } = req.payload.sub
  const { flag } = req.query
  const addresses = await userService.getAllAddress(prisma, id, flag)
  responseHandler.ok(res, addresses)
}, prisma)

// [POST] '/users/addresses'
const createAddress = catchAsync(async (req, res) => {
  const { id } = req.payload.sub
  const data = req.body
  const address = await userService.createAddress(prisma, id, data)
  responseHandler.created(res, address)
}, prisma)

// [PATCH] '/users/addresses/:addressId'
const updateAddress = catchAsync(async (req, res) => {
  const { id } = req.payload.sub
  const { addressId } = req.params
  const data = req.body
  const address = await userService.updateAddress(prisma, id, addressId, data)
  responseHandler.ok(res, address)
}, prisma)

// [DELETE] '/users/addresses/:addressId'
const deleteAddress = catchAsync(async (req, res) => {
  const { id } = req.payload.sub
  const { addressId } = req.params
  const address = await userService.deleteAddress(prisma, id, addressId)
  responseHandler.ok(res, address)
}, prisma)

// #endregion

export default {
  getAllUser,
  signUp,
  signIn,
  getUserProfile,
  getAllAddress,
  createAddress,
  updateAddress,
  deleteAddress,
  checkUserEmail,
  updateUser,
  updateUserAvatar,
  updateUserPassword,
}
