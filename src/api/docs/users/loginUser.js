export default {
  post: {
    tags: ['User'],
    description: 'Login user',
    operationId: 'loginUser',
    produces: ['application/json'],
    parameters: [],
    requestBody: {
      require: true,
      schema: {
        $ref: '#/components/schemas/UserLogin',
      },
    },
    responses: {
      200: {
        description: 'Login success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/LoginSuccessResponse',
            },
          },
        },
      },
    },
  },
}
