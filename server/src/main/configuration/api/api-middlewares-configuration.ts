import { type Express } from 'express'
import {
  bodyParserMiddleware,
  contentTypeMiddleware,
  corsMiddleware
  // securityMiddleware
} from '../../middlewares'

export const setUpApiMiddlewares = (server: Express): void => {
  server.use(bodyParserMiddleware)
  server.use(contentTypeMiddleware)
  server.use(corsMiddleware)
  // disabled helmet security middleware for now
  // server.use(securityMiddleware)
}
