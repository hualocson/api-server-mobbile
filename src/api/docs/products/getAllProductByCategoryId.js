export default {
  get: {
    tags: ['Product'], // operation's tag.
    description: 'Get all products', // operation's desc.
    operationId: 'getProductsByCategoryId', // unique operation id.
    produces: ['application/json'],
    parameters: [
      {
        name: 'id',
        in: 'path',
        description: 'Category ID',
        required: true,
        type: 'integer',
      },
    ], // expected params.
    // expected responses
    responses: {
      // response code
      200: {
        description: 'Get all products success', // response desc.
        content: {
          // content-type
          'application/json': {
            schema: {
              allOf: [
                { $ref: '#/components/schemas/Response' },
                {
                  type: 'object',
                  properties: {
                    data: {
                      type: 'object',
                      properties: {
                        category: {
                          type: 'object',
                          allOf: [
                            { $ref: '#/components/schemas/Category' },
                            {
                              type: 'object',
                              properties: {
                                products: {
                                  type: 'array',
                                  items: {
                                    $ref: '#/components/schemas/Product',
                                  },
                                },
                              },
                            },
                          ],
                        },
                      },
                    },
                  },
                },
              ],
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
