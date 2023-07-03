import { notModifiedResponse, okResponse } from '@presentation/responses'
import {
  type IWebSocketServer,
  type IMiddleware,
  type IRequest,
  type IResponse
} from '@application/ports/presentation'
import { type Log } from '@core/entities'

export class EmitLogViaWebSocketMiddleware implements IMiddleware {
  constructor(private readonly webSocketServer: IWebSocketServer) {}

  async handle(request: IRequest, response: IResponse): Promise<IResponse> {
    if (response.statusCode !== 201) return notModifiedResponse()

    const log = response.body as Log

    this.webSocketServer.emit('log', log)

    return okResponse(response.body)
  }
}
