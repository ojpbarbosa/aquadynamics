import { type Router } from 'express'
import { adaptController } from '@main/adapters'
import { getAquariumsControllerFactory } from '@main/factories/controllers'

export const setUpAquariumRoutes = (router: Router): void => {
  router.get('/aquariums', adaptController(getAquariumsControllerFactory()))
  router.get('/aquariums/:id', adaptController(getAquariumsControllerFactory()))
}
