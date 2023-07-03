import { EmitLogViaWebSocketMiddleware } from '@presentation/middlewares'
import { type IWebSocketServer } from '@application/ports/presentation'

export const emitLogViaWebSocketMiddleware = (
  webSocketServer: IWebSocketServer
): EmitLogViaWebSocketMiddleware => {
  return new EmitLogViaWebSocketMiddleware(webSocketServer)
}
