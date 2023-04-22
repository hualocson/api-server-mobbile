export default {
  post: {
    tags: ['Product'],
    description: 'Create a new product item',
    operationId: 'createProductItem',
    produces: ['application/json'],
    parameters: [],
    requestBody: {
      require: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/CreateProductItemRequest',
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
              $ref: '#/components/schemas/CreateCategorySuccessResponse',
            },
          },
        },
      },
      500: {
        description: 'Category creation failed',
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
