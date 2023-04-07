import swaggerAutogen from 'swagger-autogen'
import path from 'path'
import { getRootPath } from '~/helpers/index.js'

const docs = {
  openapi: '3.0.3',
  info: {
    title: 'API for Mobile app technical', // short title.
    description: 'RESTs Api for Mobile app', //  desc.
    version: '1.0.0', // version number
  },
  servers: [
    {
      url: 'http://localhost:5001/api/v1',
      description: 'Local server',
    },
  ],
  components: {
    securitySchemas: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    '@schemas': {
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
      AllUsers: {
        type: 'array',
        items: { $ref: '#/components/schemas/User' },
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
          statusCode: 201,
        },
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
  security: [
    {
      bearerAuth: [],
    },
  ],
}

const outputFile = path.join(getRootPath(), 'swagger_output.json')
const endpointsFiles = [path.join(getRootPath(), 'src/api/controllers/*.js')]

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, docs)
