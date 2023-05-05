import { type Express, Router } from 'express'
import { setUpDeviceRoutes, setUpLogRoutes } from '../routes'

export const setUpRoutes = (app: Express): void => {
  const router = Router()

  app.use('/', router)

  setUpDeviceRoutes(router)
  setUpLogRoutes(router)
}
