import { type IController, type IRequest, type IResponse } from '@application/ports/presentation'
import { type IGetDevicesUseCase } from '@core/use-cases'
import { type Device } from '@core/entities'
import { errorResponse, noContentResponse, okResponse } from '@presentation/responses'

export class GetDevicesController implements IController {
  constructor(private readonly getDevicesUseCase: IGetDevicesUseCase) {}

  async handle(request: IRequest): Promise<IResponse> {
    try {
      const { id } = request.parameters
      const { name, address, state, logs, orderBy, order, page, perPage } = request.query

      const devices = (await this.getDevicesUseCase.get({
        id,
        name,
        address,
        state,
        logs: logs === 'true' || logs === 'false' ? JSON.parse(logs) : undefined,
        orderBy,
        order,
        page,
        perPage
      })) as Device[]

      return devices.length > 0
        ? okResponse(
            devices.map((device) => {
              const data = {
                id: device.id,
                name: device.name,
                state: device.state,
                registeredAt: device.registeredAt,
                updatedAt: device.updatedAt
              }

              if (logs && device.logs)
                Object.assign(data, {
                  logs: device.logs.map((log) => ({
                    id: log.id,
                    data: log.data,
                    timestamp: log.timestamp
                  }))
                })

              return data
            })
          )
        : noContentResponse()
    } catch (error) {
      return errorResponse(error)
    }
  }
}
