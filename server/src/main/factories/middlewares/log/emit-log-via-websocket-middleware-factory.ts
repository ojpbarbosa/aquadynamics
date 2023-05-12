import { EmitLogViaWebSocketMiddleware } from '@presentation/middlewares'
import { findLogsMysqlRepository } from '@infrastructure/repositories'
import { type IWebSocketServer } from '@application/ports/presentation'

export const emitLogViaWebSocketMiddleware = (
  webSocketServer: IWebSocketServer
): EmitLogViaWebSocketMiddleware => {
  return new EmitLogViaWebSocketMiddleware(findLogsMysqlRepository, webSocketServer)
}
