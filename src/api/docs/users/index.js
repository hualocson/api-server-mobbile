import getUser from './getUser'
import createUser from './createUser'
import loginUser from './loginUser'

export default {
  '/users': {
    ...getUser,
  },
  '/users/signup': {
    ...createUser,
  },
  '/users/signin': {
    ...loginUser,
  },
}
