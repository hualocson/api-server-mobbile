import winston from 'winston'

import configs from '../configs/index.js'

const transports = []
if (process.env.NODE_ENV !== 'development') {
  transports.push(new winston.transports.Console())
} else {
  transports.push(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.cli(),
        winston.format.splat(),
      ),
    }),
  )
}

const logger = winston.createLogger({
  level: configs.logs.level,
  levels: winston.config.npm.levels,
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.printf(
      (info) => `${info.level}: ${[info.timestamp]}: ${info.message}`,
    ),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.align(),
  ),
  transports,
})

export default logger
