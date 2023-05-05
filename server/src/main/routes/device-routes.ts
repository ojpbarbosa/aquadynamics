import { type Router } from 'express'
import { adaptController, adaptMiddleware } from '@main/adapters'
import {
  getDevicesControllerFactory,
  registerDeviceControllerFactory,
  setDeviceStatusControllerFactory
} from '@main/factories/controllers'
import { requireRegisteredDeviceMiddlewareFactory } from '@main/factories/middlewares'

export const setUpDeviceRoutes = (router: Router): void => {
  router.get('/devices', adaptController(getDevicesControllerFactory()))
  router.get('/devices/:id', adaptController(getDevicesControllerFactory()))

  router.post('/devices', adaptController(registerDeviceControllerFactory()))

  router.patch(
    '/devices',
    adaptMiddleware(requireRegisteredDeviceMiddlewareFactory()),
    adaptController(setDeviceStatusControllerFactory())
  )
}
