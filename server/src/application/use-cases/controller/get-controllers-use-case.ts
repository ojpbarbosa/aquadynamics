import { type IGetControllersUseCase, type TGetControllersDTO } from '@core/use-cases'
import { type IFindControllersRepository } from '@application/ports/repositories'
import { type ICryptographyProvider } from '@application/ports/providers'
import { type Controller } from '@core/entities'
import { CONTROLLER_ENCRYPTION_KEY } from '@main/configuration'
import { NotFoundError } from '@application/errors'

export class GetControllersUseCase implements IGetControllersUseCase {
  constructor(
    private readonly findControllersRepository: IFindControllersRepository,
    private readonly cryptographyProvider: ICryptographyProvider
  ) {}

  async get(data: TGetControllersDTO): Promise<Controller[] | Controller> {
    const { address, logs } = data

    if (address) {
      const controller = (
        (await this.findControllersRepository.find({
          logs
        })) as Controller[]
      ).find(
        (controller) =>
          this.cryptographyProvider.decrypt(
            controller.address,
            CONTROLLER_ENCRYPTION_KEY as string
          ) === address
      )

      if (!controller) throw new NotFoundError('Controller does not exist')

      return controller
    }

    return await this.findControllersRepository.find(data)
  }
}
