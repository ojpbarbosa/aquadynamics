import express, { type Express } from 'express'
import { setUpRoutes, setUpMiddlewares } from '.'

export const setUpApp = (): Express => {
  const app = express()

  setUpMiddlewares(app)
  setUpRoutes(app)

  return app
}
