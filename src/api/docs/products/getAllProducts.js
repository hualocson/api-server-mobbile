export default {
  get: {
    tags: ['Product'], // operation's tag.
    description: 'Get all products', // operation's desc.
    operationId: 'getAllProducts', // unique operation id.
    produces: ['application/json'],
    parameters: [], // expected params.
    // expected responses
    responses: {
      // response code
      200: {
        description: 'Get all products success', // response desc.
        content: {
          // content-type
          'application/json': {
            schema: {
              $ref: '#/components/schemas/AllProducts',
            },
          },
        },
      },
      500: {
        description: 'Get all products failed', // response desc.
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
