import { type Express } from 'express'
import { createServer, Server as HttpServer } from 'http'
import { Server } from 'socket.io'

export const setUpWebSocket = (server: Express): HttpServer => {
  const http = createServer(server)
  const io = new Server(http, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST', 'PATCH']
    }
  })

  io.on('connection', (socket) => {
    console.log('WebSocket: Client connected')
    socket.on('disconnect', () => {
      console.log('WebSocket: Client disconnected')
    })
  })

  return http
}
