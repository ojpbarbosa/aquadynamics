import { type Router } from 'express'
import { adaptController } from '@main/adapters'
import {
  getControllersControllerFactory,
  registerControllerControllerFactory
} from '@main/factories/controllers'

export const setUpControllerRoutes = (router: Router): void => {
  router.get('/controllers', adaptController(getControllersControllerFactory()))
  router.get('/controllers/:id', adaptController(getControllersControllerFactory()))

  router.post('/controllers', adaptController(registerControllerControllerFactory()))
}
