import http from 'http'
import app from './app.js'
import config from './configs/index.js'

const server = http.createServer(app)
server.listen(config.port, () => {
  console.log(`Server listening on http://localhost:${config.port}`)
})
