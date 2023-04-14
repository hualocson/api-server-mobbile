export default {
  patch: {
    tags: ['Product'],
    description: 'Update product image',
    operationId: 'updateProductImage',
    produces: ['application/json'],
    parameters: [
      {
        in: 'path',
        id: 'productId',
        required: true,
        type: 'integer',
        description: 'Product ID',
      },
    ],
    requestBody: {
      require: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              imageUrl: {
                type: 'string',
                example: 'https://i.imgur.com/1J2h7Yt.jpg',
              },
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Update product image successfully',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/CreateProductSuccessResponse',
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
