import { type Router } from 'express'
import { adaptController } from '@main/adapters'
import { getLogsControllerFactory } from '@main/factories/controllers'

export const setUpLogRoutes = (router: Router): void => {
  router.get('/logs', adaptController(getLogsControllerFactory()))
  router.get('/logs/:id', adaptController(getLogsControllerFactory()))
}
