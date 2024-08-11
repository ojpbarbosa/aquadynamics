import { type ISetControllerStatusUseCase, type TSetControllerStatusDTO } from '@core/use-cases'
import { type IUpdateControllerRepository } from '@application/ports/repositories'
import { type Controller } from '@core/entities'

export class SetControllerStatusUseCase implements ISetControllerStatusUseCase {
  constructor(private readonly updateControllerRepository: IUpdateControllerRepository) {}

  async setStatus(data: TSetControllerStatusDTO): Promise<Controller> {
    return await this.updateControllerRepository.update(data)
  }
}
