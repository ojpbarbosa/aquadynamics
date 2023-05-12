import { type Express, Router } from 'express'
import { setUpControllerRoutes, setUpLogRoutes } from '../routes'

export const setUpRoutes = (app: Express): void => {
  const router = Router()

  app.use('/', router)

  setUpControllerRoutes(router)
  setUpLogRoutes(router)
}
