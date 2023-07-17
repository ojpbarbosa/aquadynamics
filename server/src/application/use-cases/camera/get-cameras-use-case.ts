import { type IGetCamerasUseCase, type TGetCamerasDTO } from '@core/use-cases'
import { type IFindCamerasRepository } from '@application/ports/repositories'
import { type ICryptographyProvider } from '@application/ports/providers'
import { type Camera } from '@core/entities'
import { CAMERA_ADDRESS_ENCRYPTION_KEY } from '@main/configuration'
import { NotFoundError } from '@application/errors'

export class GetCamerasUseCase implements IGetCamerasUseCase {
  constructor(
    private readonly findCamerasRepository: IFindCamerasRepository,
    private readonly cryptographyProvider: ICryptographyProvider
  ) {}

  async get(data: TGetCamerasDTO): Promise<Camera[] | Camera> {
    const { address } = data

    if (address) {
      const camera = ((await this.findCamerasRepository.find(data)) as Camera[]).find(
        (camera) =>
          this.cryptographyProvider.decrypt(
            camera.address,
            CAMERA_ADDRESS_ENCRYPTION_KEY as string
          ) === address
      )

      if (!camera) throw new NotFoundError('Camera does not exist')

      return camera
    }

    return await this.findCamerasRepository.find(data)
  }
}
