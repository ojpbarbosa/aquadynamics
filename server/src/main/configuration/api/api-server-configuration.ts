import express, { type Express } from 'express'
import { setUpApiMiddlewares, setUpApiRoutes } from '.'

export const setUpApiServer = (): Express => {
  const server = express()

  setUpApiMiddlewares(server)
  setUpApiRoutes(server)

  return server
}
