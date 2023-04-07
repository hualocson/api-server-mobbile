import express from 'express'

import loaders from '~loaders/index.js'

const startApp = async () => {
  const app = express()
  await loaders(app)
  return app
}

export default startApp
