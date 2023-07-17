import { type Express, Router } from 'express'
import {
  setUpAquariumRoutes,
  setUpCameraRoutes,
  setUpControllerRoutes,
  setUpLogRoutes
} from '../../routes'

export const setUpApiRoutes = (server: Express): void => {
  const router = Router()

  server.use('/api', router)

  setUpAquariumRoutes(router)
  setUpCameraRoutes(router)
  setUpControllerRoutes(router)
  setUpLogRoutes(router)
}
