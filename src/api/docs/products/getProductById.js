export default {
  get: {
    tags: ['Product'],
    description: 'Update product image',
    operationId: 'getProductById',
    produces: ['application/json'],
    parameters: [
      {
        name: 'productId',
        in: 'path',
        required: true,
        type: 'integer',
        description: 'Product ID',
      },
    ],
    responses: {
      200: {
        description: 'Update product image successfully',
        content: {
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
                        product: {
                          allOf: [
                            { $ref: '#/components/schemas/Product' },
                            {
                              type: 'object',
                              properties: {
                                productItems: {
                                  type: 'array',
                                  items: {
                                    $ref: '#/components/schemas/ProductItem',
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
        description: 'Update product image failed',
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
