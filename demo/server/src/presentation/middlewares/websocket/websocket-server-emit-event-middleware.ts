import { notModifiedResponse, okResponse } from '@presentation/responses'
import {
  type IWebSocketServer,
  type IMiddleware,
  type IRequest,
  type IResponse
} from '@application/ports/presentation'

export class WebSocketServerEmitEventMiddleware implements IMiddleware {
  constructor(
    private readonly eventName: string,
    private readonly webSocketServer: IWebSocketServer
  ) {}

  async handle(request: IRequest, response: IResponse): Promise<IResponse> {
    if (response.statusCode < 200 || response.statusCode >= 300) return notModifiedResponse()

    const data = response.body

    if (!data) return notModifiedResponse()

    this.webSocketServer.emit(this.eventName, data)

    return okResponse(data)
  }
}
