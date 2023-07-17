import { type IController, type IRequest, type IResponse } from '@application/ports/presentation'
import { type IGetAquariumsUseCase } from '@core/use-cases'
import { Controller, type Aquarium, Camera } from '@core/entities'
import { errorResponse, okResponse } from '@presentation/responses'

export class GetAquariumsController implements IController {
  constructor(private readonly getAquariumsUseCase: IGetAquariumsUseCase) {}

  async handle(request: IRequest): Promise<IResponse> {
    try {
      const { id } = request.parameters
      const { name, orderBy, order, page, perPage } = request.query
      let { cameras, controllers, logs } = request.query

      cameras = cameras === 'true' || controllers === 'false' ? JSON.parse(controllers) : undefined
      controllers =
        controllers === 'true' || controllers === 'false' ? JSON.parse(controllers) : undefined
      logs = logs === 'true' || logs === 'false' ? JSON.parse(logs) : undefined

      let aquariums = (await this.getAquariumsUseCase.get({
        id,
        name,
        cameras,
        controllers,
        logs,
        orderBy,
        order,
        page,
        perPage
      })) as Aquarium[]

      aquariums = aquariums.map((aquarium) => {
        const { camera }: { camera?: Partial<Camera> } = aquarium
        if (cameras && camera) {
          delete camera.address

          Object.assign(aquarium, {
            camera
          })
        }

        if (logs && aquarium.logs)
          Object.assign(aquarium, {
            logs: aquarium.logs.map((log) => {
              delete log.controller
              delete log.aquarium

              return log
            })
          })

        const { controller }: { controller?: Partial<Controller> } = aquarium
        if (controllers && controller) {
          delete controller.address
          delete controller.aquarium
          delete controller.logs

          Object.assign(aquarium, {
            controller
          })
        }

        return aquarium
      })

      return okResponse(aquariums.length === 1 && id ? aquariums[0] : aquariums)
    } catch (error) {
      console.error('ControllerError: ', error)
      return errorResponse(error)
    }
  }
}
