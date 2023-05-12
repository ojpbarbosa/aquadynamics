import { type Express } from 'express'
import { contentType, cors, json } from '../../middlewares'

export const setUpApiMiddlewares = (server: Express): void => {
  server.use(contentType)
  server.use(cors)
  server.use(json)
}
