import { type IController, type IRequest, type IResponse } from '@application/ports/presentation'
import { type IGetCamerasUseCase } from '@core/use-cases'
import { type Camera } from '@core/entities'
import { errorResponse, okResponse } from '@presentation/responses'

export class GetCamerasController implements IController {
  constructor(private readonly getCamerasUseCase: IGetCamerasUseCase) {}

  async handle(request: IRequest): Promise<IResponse> {
    try {
      const { id } = request.parameters
      const { aquariumId, address, orderBy, order, page, perPage } = request.query
      let { aquariums } = request.query

      aquariums = aquariums === 'true' || aquariums === 'false' ? JSON.parse(aquariums) : undefined

      let cameras = (await this.getCamerasUseCase.get({
        id,
        aquariumId,
        address,
        aquariums,
        orderBy,
        order,
        page,
        perPage
      })) as Camera[]

      cameras = cameras.map((camera: Partial<Camera>) => {
        delete camera.address

        const { aquarium } = camera
        if (aquariums && aquarium) {
          delete aquarium.camera

          Object.assign(camera, {
            aquarium
          })
        }

        return camera
      }) as Camera[]

      return okResponse(cameras.length === 1 && id ? cameras[0] : cameras)
    } catch (error) {
      console.error('ControllerError: ', error)
      return errorResponse(error)
    }
  }
}
