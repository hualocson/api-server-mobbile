export default {
  post: {
    tags: ['Product'],
    description: 'Create a new product',
    operationId: 'createProduct',
    produces: ['application/json'],
    parameters: [],
    requestBody: {
      require: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/CreateProductRequest',
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Product created successfully',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/CreateProductSuccessResponse',
            },
          },
        },
      },
      500: {
        description: 'Product creation failed',
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
