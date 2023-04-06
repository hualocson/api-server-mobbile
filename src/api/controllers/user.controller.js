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
  // #swagger.start
  // #swagger.path = '/users'
  // #swagger.method = 'get'
  // #swagger.tags = ['User']
  // #swagger.description = 'Get all users'

  try {
    const { allUsers } = await getListUserService(prisma)
    /*
    #swagger.responses[200] = {
      description: 'Get all users success',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/AllUsers',
          },
        },
      },
    }
    */
    responseHandler.ok(res, { users: allUsers })
  } catch (error) {
    /* #swagger.responses[500] = {
    description: "Sign up fail",
    content: {
        "application/json": {
            schema:{
                "$ref": "#/components/schemas/Response"
            },
            examples: {
              ServerError: {
                "$ref": "#/components/examples/ServerErrorResponse"
              }
            }
        }
    }
}
*/
    responseHandler.error(res, error)
  }
  // #swagger.end
}

// [POST] '/users/signup'
const signUp = async (req, res) => {
  // #swagger.start
  // #swagger.path = '/users/signup'
  // #swagger.method = 'post'
  // #swagger.tags = ['User']
  // #swagger.description = 'Create new user'

  /*	#swagger.requestBody = {
            required: true,
            schema: { $ref: "#/components/schemas/UserRegister" }
    } */
  const data = req.body
  try {
    const user = await createUserService(prisma, data)
    /* #swagger.responses[201] = {
            description: "Sign up success",
            content: {
                "application/json": {
                    schema:{
                        allOf: [
                          { "$ref": "#/components/schemas/Response"},
                          {
                            type: "object",
                            properties: {
                              data: {
                                "$ref": "#/components/schemas/User"
                              }
                            }
                          }
                        ]
                    },
                    examples: {
                      CreatedUserResponse: {
                        "$ref": "#/components/examples/CreatedUserResponse"
                      }
                    }
                }
            }
        }
    */
    responseHandler.created(res, user)
  } catch (error) {
    const err = {
      message: error.message,
      statusCode: error.statusCode(),
    }

    /* #swagger.responses[500] = {
            description: "Sign up fail",
            content: {
                "application/json": {
                    schema:{
                        "$ref": "#/components/schemas/Response"
                    },
                    examples: {
                      ServerError: {
                        "$ref": "#/components/examples/ServerErrorResponse"
                      }
                    }
                }
            }
        }
      */
    responseHandler.error(res, err)
  } finally {
    await prisma.$disconnect()
  }
  // #swagger.end
}

// [POST] '/users/signIn'
const signIn = async (req, res) => {
  // #swagger.start
  // #swagger.path = '/users/signin'
  // #swagger.method = 'post'
  // #swagger.tags = ['User']
  // #swagger.description = 'Sign in user'
  /*	#swagger.requestBody = {
            required: true,
            schema: { $ref: "#/components/schemas/UserLogin" }
    }
    */
  try {
    // TODO: validate data
    const user = await signInService(prisma, req.body)
    /* #swagger.responses[200] = {
            description: "Sign in success",
            content: {
                "application/json": {
                    schema:{
                        allOf: [
                          { "$ref": "#/components/schemas/Response"},
                          {
                            type: "object",
                            properties: {
                              data: {
                                "$ref": "#/components/schemas/User"
                              }
                            }
                          }
                        ]
                    },
                    examples: {
                      CreatedUserResponse: {
                        "$ref": "#/components/examples/SignInSuccessResponse"
                      }
                    }
                }
            }
        }
    */
    responseHandler.ok(res, user)
  } catch (error) {
    if (error instanceof MyError) {
      const err = {
        message: error.message,
        statusCode: error.statusCode(),
      }
      responseHandler.error(res, err)
    } else {
      /* #swagger.responses[500] = {
            description: "Sign up fail",
            content: {
                "application/json": {
                    schema:{
                        "$ref": "#/components/schemas/Response"
                    },
                    examples: {
                      ServerError: {
                        "$ref": "#/components/examples/ServerErrorResponse"
                      }
                    }
                }
            }
        }
      */
      responseHandler.error(res, error)
    }
  } finally {
    await prisma.$disconnect()
  }
  // #swagger.end
}

export { getAllUser, signUp, signIn }
