import { type IGetControllersUseCase, type TGetControllersDTO } from '@core/use-cases'
import { type IFindControllersRepository } from '@application/ports/repositories'
import { type ICryptographyProvider } from '@application/ports/providers'
import { type Controller } from '@core/entities'

export class GetControllersUseCase implements IGetControllersUseCase {
  constructor(private readonly findControllersRepository: IFindControllersRepository) {}

  async get(data: TGetControllersDTO): Promise<Controller[] | Controller> {
    return await this.findControllersRepository.find(data)
  }
}
