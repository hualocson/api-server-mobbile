export default {
  post: {
    tags: ['User'],
    description: 'Create a new user',
    operationId: 'createUser',
    produces: ['application/json'],
    parameters: [],

    requestBody: {
      require: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/UserRegister',
          },
        },
      },
    },
    responses: {
      201: {
        description: 'User created successfully',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/RegisterSuccessResponse',
            },
          },
        },
      },
      500: {
        description: 'User creation failed',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Response',
            },
            examples: {
              ServerError: {
                $ref: '#/components/examples/ServerErrorResponse',
              },
            },
          },
        },
      },
    },
  },
}
