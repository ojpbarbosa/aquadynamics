import { type Express, Router } from 'express'
import { setUpControllerRoutes, setUpLogRoutes } from '../../routes'

export const setUpApiRoutes = (server: Express) => {
  const router = Router()

  server.use('/api', router)

  setUpControllerRoutes(router)
  setUpLogRoutes(router)
}
