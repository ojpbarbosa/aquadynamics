import { type IController, type IRequest, type IResponse } from '@application/ports/presentation'
import { type IGetAquariumsUseCase } from '@core/use-cases'
import { type Aquarium } from '@core/entities'
import { errorResponse, okResponse } from '@presentation/responses'

export class GetAquariumsController implements IController {
  constructor(private readonly getAquariumsUseCase: IGetAquariumsUseCase) {}

  async handle(request: IRequest): Promise<IResponse> {
    try {
      const { id } = request.parameters
      const { name, orderBy, order, page, perPage } = request.query
      let { controllers, logs } = request.query

      controllers =
        controllers === 'true' || controllers === 'false' ? JSON.parse(controllers) : undefined
      logs = logs === 'true' || logs === 'false' ? JSON.parse(logs) : undefined

      const aquariums = (await this.getAquariumsUseCase.get({
        id,
        name,
        controllers,
        logs,
        orderBy,
        order,
        page,
        perPage
      })) as Aquarium[]

      return okResponse(
        aquariums.map((aquarium) => {
          if (logs && aquarium.logs)
            Object.assign(aquarium, {
              logs: aquarium.logs.map((log) => {
                delete log.controller
                delete log.aquarium

                return log
              })
            })

          const { controller } = aquarium
          if (controllers && controller) {
            delete controller.aquarium
            delete controller.logs

            Object.assign(aquarium, {
              controller
            })
          }

          return aquarium
        })
      )
    } catch (error) {
      console.error('ControllerError: ', error)
      return errorResponse(error)
    }
  }
}
