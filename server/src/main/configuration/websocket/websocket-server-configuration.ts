import { type Express } from 'express'
import { createServer, type Server as HttpServer } from 'http'
import { Server as WebSocketServer } from 'socket.io'

type WebSocketServerSetup = {
  httpServer: HttpServer
  webSocketServer: WebSocketServer
}

export const setUpWebSocketServer = (server: Express): WebSocketServerSetup => {
  const httpServer = createServer(server)
  const webSocketServer = new WebSocketServer(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST', 'PATCH']
    }
  })

  return {
    httpServer,
    webSocketServer
  }
}
