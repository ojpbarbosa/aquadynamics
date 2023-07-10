import { type Express } from 'express'
import {
  bodyParserMiddleware,
  contentTypeMiddleware,
  corsMiddleware,
  securityMiddleware
} from '../../middlewares'

export const setUpApiMiddlewares = (server: Express): void => {
  server.use(bodyParserMiddleware)
  server.use(contentTypeMiddleware)
  server.use(corsMiddleware)
  server.use(securityMiddleware)
}
