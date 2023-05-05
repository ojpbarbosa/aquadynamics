import { type IController, type IRequest, type IResponse } from '@application/ports/presentation'
import { type IGetLogsUseCase } from '@core/use-cases'
import { type Log } from '@core/entities'
import { errorResponse, noContentResponse, okResponse } from '@presentation/responses'

export class GetLogsController implements IController {
  constructor(private readonly getLogsUseCase: IGetLogsUseCase) {}

  async handle(request: IRequest): Promise<IResponse> {
    try {
      const { id, deviceId } = request.parameters
      const { orderBy, order, page, perPage } = request.query
      let { devices } = request.query

      devices = devices === 'true' || devices === 'false' ? JSON.parse(devices) : undefined

      const logs = (await this.getLogsUseCase.get({
        id,
        deviceId,
        devices,
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
                timestamp: log.timestamp
              }

              if (devices && log.device)
                Object.assign(data, {
                  device: {
                    name: log.device.name,
                    status: log.device.status,
                    registeredAt: log.device.registeredAt,
                    updatedAt: log.device.updatedAt
                  }
                })

              return data
            })
          )
        : noContentResponse()
    } catch (error) {
      console.error(error)
      return errorResponse(error)
    }
  }
}
