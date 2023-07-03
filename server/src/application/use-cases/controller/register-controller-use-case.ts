import { type IRegisterControllerUseCase, type TRegisterControllerDTO } from '@core/use-cases'
import {
  type IFindControllersRepository,
  type ICreateControllerRepository
} from '@application/ports/repositories'
import { type ICryptographyProvider, type IUniqueIdProvider } from '@application/ports/providers'
import { type Controller } from '@core/entities'
import { ConflictError } from '@application/errors'
import { CONTROLLER_ENCRYPTION_KEY } from '@main/configuration'

export class RegisterControllerUseCase implements IRegisterControllerUseCase {
  constructor(
    private readonly findControllersRepository: IFindControllersRepository,
    private readonly cryptographyProvider: ICryptographyProvider,
    private readonly createControllerRepository: ICreateControllerRepository,
    private readonly uniqueIdProvider: IUniqueIdProvider
  ) {}

  async register(data: TRegisterControllerDTO): Promise<Controller> {
    const { address } = data

    if (
      ((await this.findControllersRepository.find()) as Controller[]).find(
        (controller) =>
          this.cryptographyProvider.decrypt(
            controller.address,
            CONTROLLER_ENCRYPTION_KEY as string
          ) === address
      )
    )
      throw new ConflictError('Controller already exists')

    const { aquariumId } = data

    return await this.createControllerRepository.create({
      id: this.uniqueIdProvider.generate(),
      address: this.cryptographyProvider.encrypt(address, CONTROLLER_ENCRYPTION_KEY as string),
      aquariumId
    })
  }
}
