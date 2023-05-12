import express, { type Express } from 'express'
import { setUpApiRoutes, setUpApiMiddlewares } from '.'

export const setUpServer = (): Express => {
  const server = express()

  setUpApiMiddlewares(server)
  setUpApiRoutes(server)

  return server
}
