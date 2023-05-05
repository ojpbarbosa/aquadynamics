import { type IController, type IRequest, type IResponse } from '@application/ports/presentation'
import { type IGetLogsUseCase } from '@core/use-cases'
import { type Log } from '@core/entities'
import { noContentResponse, okResponse } from '@presentation/responses'

export class GetLogsController implements IController {
  constructor(private readonly getLogsUseCase: IGetLogsUseCase) {}

  async handle(request: IRequest): Promise<IResponse> {
    const { id, deviceId } = request.parameters
    const { devices, orderBy, order, page, perPage } = request.query

    const logs = (await this.getLogsUseCase.get({
      id,
      deviceId,
      devices: JSON.parse(devices) as boolean,
      orderBy,
      order,
      page,
      perPage
    })) as Log[]

    return logs.length > 0
      ? okResponse(
          logs.map((log) => {
            const data = {
              id: log.id,
              deviceId: log.deviceId,
              data: log.data,
              timestamp: log.timestamp,
              device: {
                name: log.device?.name,
                state: log.device?.state,
                registeredAt: log.device?.registeredAt,
                updatedAt: log.device?.updatedAt
              } as any
            }

            if (!devices) delete data.device

            return data
          })
        )
      : noContentResponse()
  }
}
