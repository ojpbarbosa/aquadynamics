import { type IRegisterCameraUseCase, type TRegisterCameraDTO } from '@core/use-cases'
import {
  type IFindCamerasRepository,
  type IFindAquariumsRepository,
  type ICreateCameraRepository
} from '@application/ports/repositories'
import { type ICryptographyProvider, type IUniqueIdProvider } from '@application/ports/providers'
import { type Camera } from '@core/entities'
import { ConflictError, NotFoundError } from '@application/errors'
import { CAMERA_ADDRESS_ENCRYPTION_KEY } from '@main/configuration'

export class RegisterCameraUseCase implements IRegisterCameraUseCase {
  constructor(
    private readonly findCamerasRepository: IFindCamerasRepository,
    private readonly findAquariumsRepository: IFindAquariumsRepository,
    private readonly cryptographyProvider: ICryptographyProvider,
    private readonly createCameraRepository: ICreateCameraRepository,
    private readonly uniqueIdProvider: IUniqueIdProvider
  ) {}

  async register(data: TRegisterCameraDTO): Promise<Camera> {
    const { address } = data

    if (
      ((await this.findCamerasRepository.find()) as Camera[]).find(
        (camera) =>
          this.cryptographyProvider.decrypt(
            camera.address,
            CAMERA_ADDRESS_ENCRYPTION_KEY as string
          ) === address
      )
    )
      throw new ConflictError('Camera already exists')

    const { aquariumId } = data

    const aquarium = await this.findAquariumsRepository.find({ id: aquariumId })

    if (!aquarium) throw new NotFoundError('Aquarium does not exist')

    return await this.createCameraRepository.create({
      id: this.uniqueIdProvider.generate(),
      address: this.cryptographyProvider.encrypt(address, CAMERA_ADDRESS_ENCRYPTION_KEY as string),
      aquariumId
    })
  }
}
