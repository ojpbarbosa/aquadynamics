import { IController, IRequest, IResponse } from '@application/ports/presentation'
import { IGetDevicesUseCase } from '@core/use-cases'
import { Device } from '@core/entities'
import { noContentResponse, okResponse } from '@presentation/responses'

export class GetDevicesController implements IController {
  constructor(private readonly getDevicesUseCase: IGetDevicesUseCase) {}

  async handle(request: IRequest): Promise<IResponse> {
    const { id, name, address, state, logs, orderBy, order, page, perPage } = request.parameters

    const devices = (await this.getDevicesUseCase.get({
      id,
      name,
      address,
      state,
      logs,
      orderBy,
      order,
      page,
      perPage
    })) as Device[]

    return devices.length > 0
      ? okResponse(
          devices.map((device) => {
            let data = {
              id: device.id,
              name: device.name,
              state: device.state,
              registeredAt: device.registeredAt,
              updatedAt: device.updatedAt
            }

            if (logs) {
              data = {
                ...data,
                logs: device.logs?.map()
              }
            }

            return data
          })
        )
      : noContentResponse()
  }
}
