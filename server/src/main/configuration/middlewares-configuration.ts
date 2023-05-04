import { type Express } from 'express'
import { contentType, cors, json } from '../middlewares'

export const setUpMiddlewares = (app: Express): void => {
  app.use(contentType)
  app.use(cors)
  app.use(json)
}
