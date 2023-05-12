import { type Express, Router } from 'express'
import { setUpControllerRoutes, setUpLogRoutes } from '../routes'

export const setUpRoutes = (app: Express) => {
  const router = Router()

  app.use('/api', router)

  setUpControllerRoutes(router)
  setUpLogRoutes(router)
}
