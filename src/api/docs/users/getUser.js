export default {
  get: {
    tags: ['User'], // operation's tag.
    description: 'Get all users', // operation's desc.
    operationId: 'getAllUser', // unique operation id.
    produces: ['application/json'],
    parameters: [], // expected params.
    // expected responses
    responses: {
      // response code
      200: {
        description: 'Get all users success', // response desc.
        content: {
          // content-type
          'application/json': {
            schema: {
              $ref: '#/components/schemas/AllUsers',
            },
          },
        },
      },
      500: {
        description: 'Get all users failed', // response desc.
        content: {
          // content-type
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
