export default {
  components: {
    securitySchemas: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            example: 1,
          },
          firstName: {
            type: 'string',
            example: 'John',
          },
          lastName: {
            type: 'string',
            example: 'Doe',
          },
          email: {
            type: 'string',
            example: 'email@gmail.com',
          },
          password: {
            type: 'string',
            example: '123456',
          },
          phone: {
            type: 'string',
            example: '09876543219',
          },
          avatar: {
            type: 'string',
            example: 'https://i.imgur.com/1J2h7Yt.jpg',
          },
        },
      },
      Product: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            example: 1,
          },
          categoryId: {
            type: 'integer',
            example: 1,
          },
          name: {
            type: 'string',
            example: 'Product 1',
          },
          description: {
            type: 'string',
            example: 'Product 1 description',
          },
          productImage: {
            type: 'string',
            example: 'https://i.imgur.com/1J2h7Yt.jpg',
          },
          minPrice: {
            type: 'number',
            example: 1000000,
          },
        },
      },
      Category: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            example: 1,
          },
          categoryName: {
            type: 'string',
            example: 'Laptop',
          },
          icUrl: {
            type: 'string',
            example: 'https://i.imgur.com/1J2h7Yt.jpg',
          },
        },
      },
      ProductItem: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            example: 1,
          },
          productImage: {
            type: 'string',
            example: 'https://i.imgur.com/1J2h7Yt.jpg',
          },
          price: {
            type: 'number',
            example: 1000000,
          },
          qtyInStock: {
            type: 'integer',
            example: 10,
          },
          productConfigurations: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/ProductConfiguration',
            },
          },
        },
      },
      ProductConfiguration: {
        type: 'object',
        properties: {
          variation: {
            type: 'string',
            example: 'Color',
          },
          value: {
            type: 'string',
            example: 'Red',
          },
        },
      },
      CreateProductRequest: {
        type: 'object',
        properties: {
          categoryId: {
            type: 'integer',
            example: 1,
          },
          name: {
            type: 'string',
            example: 'Product 1',
          },
          description: {
            type: 'string',
            example: 'Product 1 description',
          },
          productImage: {
            type: 'string',
            example: 'https://i.imgur.com/1J2h7Yt.jpg',
          },
        },
      },
      CreateCategoryRequest: {
        type: 'object',
        properties: {
          categoryName: {
            type: 'string',
            example: 'Laptop',
          },
          icUrl: {
            type: 'string',
            example: 'https://i.imgur.com/1J2h7Yt.jpg',
          },
          variations: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                },
              },
            },
            example: [{ name: 'Color' }, { name: 'Size' }],
          },
        },
      },
      CreateProductItemRequest: {
        type: 'object',
        properties: {
          qtyInStock: {
            type: 'integer',
            example: 10,
          },
          price: {
            type: 'number',
            example: 1000000,
          },
          productConfigurations: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                variationId: {
                  type: 'integer',
                  example: 1,
                },
                value: {
                  type: 'string',
                  example: 'Red',
                },
              },
            },
          },
        },
      },
      CreateProductSuccessResponse: {
        allOf: [
          { $ref: '#/components/schemas/Response' },
          {
            type: 'object',
            properties: {
              data: {
                type: 'object',
                properties: {
                  product: {
                    $ref: '#/components/schemas/Product',
                  },
                },
              },
            },
          },
        ],
        example: {
          success: true,
          data: {
            product: {
              id: 1,
              categoryId: 1,
              name: 'Product 1',
              description: 'Product 1 description',
              productImage: 'https://i.imgur.com/1J2h7Yt.jpg',
            },
          },
          message: 'Product created successfully',
          statusCode: 201,
        },
      },
      CreateCategorySuccessResponse: {
        allOf: [
          { $ref: '#/components/schemas/Response' },
          {
            type: 'object',
            properties: {
              data: {
                $ref: '#/components/schemas/Category',
              },
            },
          },
        ],
        example: {
          success: true,
          data: {
            id: 1,
            categoryName: 'Laptop',
            icUrl: 'https://i.imgur.com/1J2h7Yt.jpg',
          },
          message: 'Request successful!',
          statusCode: 201,
        },
      },
      UserLogin: {
        type: 'object',
        properties: {
          email: {
            type: 'string',
            example: 'email@gmail.com',
          },
          password: {
            type: 'string',
            example: '123456',
          },
        },
      },
      UserRegister: {
        type: 'object',
        properties: {
          firstName: {
            type: 'string',
            example: 'John',
          },
          lastName: {
            type: 'string',
            example: 'Doe',
          },
          email: {
            type: 'string',
            example: 'email@gmail.com',
          },
          password: {
            type: 'string',
            example: '123456',
          },
          phone: {
            type: 'string',
            example: '09876543219',
          },
          avatar: {
            type: 'string',
            example: 'https://i.imgur.com/1J2h7Yt.jpg',
          },
        },
      },
      RegisterSuccessResponse: {
        allOf: [
          { $ref: '#/components/schemas/Response' },
          {
            type: 'object',
            properties: {
              data: {
                $ref: '#/components/schemas/User',
              },
            },
          },
        ],
        example: {
          success: true,
          data: {
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            email: 'hualocson@gmail.com',
            password: 'hashed password',
            phone: '09876543219',
            avatar: 'https://i.imgur.com/1J2h7Yt.jpg',
          },
          message: 'Request successful!',
          statusCode: 201,
        },
      },
      LoginSuccessResponse: {
        allOf: [
          { $ref: '#/components/schemas/Response' },
          {
            type: 'object',
            properties: {
              data: {
                $ref: '#/components/schemas/LoginSuccessData',
              },
            },
          },
        ],
        example: {
          success: true,
          data: {
            access: {
              token: 'JWT access token',
              expires: '2020-01-01T00:00:00.000Z',
            },
            refresh: {
              token: 'JWT refresh token',
              expires: '2020-01-01T00:00:00.000Z',
            },
          },
          message: 'Login success',
          statusCode: 200,
        },
      },
      AllUsers: {
        type: 'array',
        items: { $ref: '#/components/schemas/User' },
      },
      LoginSuccessData: {
        type: 'object',
        properties: {
          access: {
            type: 'object',
            properties: {
              token: {
                type: 'string',
              },
              expires: {
                type: 'string',
              },
            },
          },
          refresh: {
            type: 'object',
            properties: {
              token: {
                type: 'string',
              },
              expires: {
                type: 'string',
              },
            },
          },
        },
      },
      Response: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
          },
          data: {
            type: 'object',
          },
          message: {
            type: 'string',
          },
          statusCode: {
            type: 'integer',
          },
        },
      },
    },
    examples: {
      CreatedUserResponse: {
        value: {},
      },
      SignInSuccessResponse: {
        value: {
          success: true,
          data: {
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            email: 'hualocson@gmail.com',
            phone: '09876543219',
            avatar: 'https://i.imgur.com/1J2h7Yt.jpg',
          },
          message: 'Request successful!',
          statusCode: 200,
        },
      },
      ServerErrorResponse: {
        value: {
          success: false,
          data: null,
          message: 'Request failed!',
          statusCode: 500,
        },
      },
    },
  },
}
