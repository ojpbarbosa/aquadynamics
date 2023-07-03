import { WebSocketServerEmitEventMiddleware } from '@presentation/middlewares'
import { type IWebSocketServer } from '@application/ports/presentation'

export const webSocketEmitEventMiddlewareFactory = (
  eventName: string,
  webSocketServer: IWebSocketServer
): WebSocketServerEmitEventMiddleware => {
  return new WebSocketServerEmitEventMiddleware(eventName, webSocketServer)
}
