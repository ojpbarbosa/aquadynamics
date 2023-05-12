import { type Router } from 'express'
import { adaptController, adaptMiddleware } from '@main/adapters'
import {
  getControllersControllerFactory,
  registerControllerControllerFactory,
  setControllerStatusControllerFactory
} from '@main/factories/controllers'
import { requireRegisteredControllerMiddlewareFactory } from '@main/factories/middlewares'

export const setUpControllerRoutes = (router: Router): void => {
  router.get('/controllers', adaptController(getControllersControllerFactory()))
  router.get('/controllers/:id', adaptController(getControllersControllerFactory()))

  router.post('/controllers', adaptController(registerControllerControllerFactory()))

  router.patch(
    '/controllers',
    adaptMiddleware(requireRegisteredControllerMiddlewareFactory()),
    adaptController(setControllerStatusControllerFactory())
  )
}
