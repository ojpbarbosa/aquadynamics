import { type IController, type IRequest, type IResponse } from '@application/ports/presentation'
import { type IGetLogsUseCase } from '@core/use-cases'
import { type Controller, type Log } from '@core/entities'
import { errorResponse, okResponse } from '@presentation/responses'

export class GetLogsController implements IController {
  constructor(private readonly getLogsUseCase: IGetLogsUseCase) {}

  async handle(request: IRequest): Promise<IResponse> {
    try {
      const { id } = request.parameters
      const {
        aquariumId,
        controllerId,
        temperature,
        pH,
        lightning,
        orderBy,
        order,
        page,
        perPage
      } = request.query
      let { aquariums, controllers } = request.query

      aquariums = aquariums === 'true' || aquariums === 'false' ? JSON.parse(aquariums) : undefined
      controllers =
        controllers === 'true' || controllers === 'false' ? JSON.parse(controllers) : undefined

      const logs = (await this.getLogsUseCase.get({
        id,
        aquariumId,
        controllerId,
        temperature,
        pH,
        lightning,
        aquariums,
        controllers,
        orderBy,
        order,
        page,
        perPage
      })) as Log[]

      return okResponse(
        logs.map((log: Partial<Log>) => {
          const { controller }: { controller?: Partial<Controller> } = log
          if (controllers && controller) {
            delete controller.address
            delete controller.aquarium
            delete controller.logs

            Object.assign(log, { controller })
          }

          const { aquarium } = log
          if (aquariums && aquarium) {
            delete aquarium.controller
            delete aquarium.logs

            Object.assign(log, { aquarium })
          }

          return log
        })
      )
    } catch (error) {
      console.error('ControllerError: ', error)
      return errorResponse(error)
    }
  }
}
