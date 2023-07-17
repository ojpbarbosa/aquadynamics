import { type Router } from 'express'
import { adaptController } from '@main/adapters'
import {
  getCamerasControllerFactory,
  registerCameraControllerFactory
} from '@main/factories/controllers'

export const setUpCameraRoutes = (router: Router): void => {
  router.get('/cameras', adaptController(getCamerasControllerFactory()))
  router.get('/cameras/:id', adaptController(getCamerasControllerFactory()))

  router.post('/cameras', adaptController(registerCameraControllerFactory()))
}
