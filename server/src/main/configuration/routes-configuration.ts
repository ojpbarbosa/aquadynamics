import { type Express, Router } from 'express'
import { setUpArticleRoutes } from '../routes'

export const setUpRoutes = (app: Express): void => {
  const router = Router()

  app.use('/', router)

  setUpArticleRoutes(router)
}
