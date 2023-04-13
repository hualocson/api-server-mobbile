import { PrismaClient } from '@prisma/client'

import responseHandler from '~api/handlers/response.handler.js'
import { userService, authService, tokenService } from '~api/services/index.js'
import catchAsync from '~utils/catch-async.js'

const prisma = new PrismaClient()
// [GET] '/users/'
const getAllUser = catchAsync(async (req, res) => {
  // #swagger.start
  // #swagger.path = '/users'
  // #swagger.method = 'get'
  // #swagger.tags = ['User']
  // #swagger.description = 'Get all users'
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
    #swagger.responses[500] = {
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
  // #swagger.end
  const { allUsers } = await userService.getListUser(prisma)
  responseHandler.ok(res, { users: allUsers })
}, prisma)

// [POST] '/users/signup'
const signUp = catchAsync(async (req, res) => {
  // #swagger.start
  // #swagger.path = '/users/signup'
  // #swagger.method = 'post'
  // #swagger.tags = ['User']
  // #swagger.description = 'Create new user'

  /*	#swagger.requestBody = {
            required: true,
            schema: { $ref: "#/components/schemas/UserRegister" }
    } */

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
      #swagger.responses[500] = {
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

  // #swagger.end
  const data = req.body
  const user = await userService.createUser(prisma, data)
  responseHandler.created(res, user)
}, prisma)

// [POST] '/users/signIn'
const signIn = catchAsync(async (req, res) => {
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
      #swagger.responses[500] = {
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
  // #swagger.end
  // TODO: validate data
  const { email, password } = req.body
  const user = await authService.loginUserWithEmailAndPassword(
    prisma,
    email,
    password,
  )
  const tokens = await tokenService.generateAuthTokens(user)
  responseHandler.ok(res, tokens)
  return 'message'
}, prisma)

export default { getAllUser, signUp, signIn }
