import { PrismaClient } from '@prisma/client'

import responseHandler from '../handlers/response.handler.js'
import {
  getListUserService,
  createUserService,
  signInService,
} from '../services/user.service.js'
import MyError from '../utils/error.js'

const prisma = new PrismaClient()
// [GET] '/users/'
const getAllUser = async (req, res) => {
  try {
    const { allUsers } = await getListUserService(prisma)
    responseHandler.ok(res, { users: allUsers })
  } catch (error) {
    responseHandler.error(res, error)
  }
}

// [POST] '/users/signup'
const signUp = async (req, res) => {
  const data = req.body
  try {
    const user = await createUserService(prisma, data)
    responseHandler.created(res, user)
  } catch (error) {
    const err = {
      message: error.message,
      statusCode: error.statusCode(),
    }
    responseHandler.error(res, err)
  } finally {
    await prisma.$disconnect()
  }
}

// [POST] '/users/signIn'
const signIn = async (req, res) => {
  try {
    // TODO: validate data
    const user = await signInService(prisma, req.body)

    responseHandler.ok(res, user)
  } catch (error) {
    if (error instanceof MyError) {
      const err = {
        message: error.message,
        statusCode: error.statusCode(),
      }
      responseHandler.error(res, err)
    } else {
      responseHandler.error(res, error)
    }
  } finally {
    await prisma.$disconnect()
  }
}

export { getAllUser, signUp, signIn }
