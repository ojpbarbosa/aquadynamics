import { notModifiedResponse, okResponse } from '@presentation/responses'
import {
  type IWebSocketServer,
  type IMiddleware,
  type IRequest,
  type IResponse
} from '@application/ports/presentation'
import { type IFindLogsRepository } from '@application/ports/repositories'
import { type Log } from '@core/entities'

export class EmitLogViaWebSocketMiddleware implements IMiddleware {
  constructor(
    private readonly findLogsRepository: IFindLogsRepository,
    private readonly webSocketServer: IWebSocketServer
  ) {}

  async handle(request: IRequest, response: IResponse): Promise<IResponse> {
    const { id } = response.body as { id: string }

    if (response.statusCode !== 200 || !id) return notModifiedResponse()

    const log = (await this.findLogsRepository.find({ id, controllers: true })) as Log

    if (!log) return notModifiedResponse()

    this.webSocketServer.emit('log', {
      id: log.id,
      controllerId: log.controllerId,
      type: log.type,
      data: log.data,
      reading: log.reading,
      timestamp: log.timestamp,
      controller: {
        aquarium: log.controller?.aquarium,
        status: log.controller?.status,
        registeredAt: log.controller?.registeredAt,
        updatedAt: log.controller?.updatedAt
      }
    })

    return okResponse(response.body)
  }
}
