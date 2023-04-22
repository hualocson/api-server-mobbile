export default {
  post: {
    tags: ['Product'],
    description: 'Create a new category',
    operationId: 'createCategory',
    produces: ['application/json'],
    parameters: [],
    requestBody: {
      require: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/CreateCategoryRequest',
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Category created successfully',
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
