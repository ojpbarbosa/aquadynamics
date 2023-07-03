import { type IGetAquariumsUseCase, type TGetAquariumsDTO } from '@core/use-cases'
import { type IFindAquariumsRepository } from '@application/ports/repositories'
import { type Aquarium } from '@core/entities'

export class GetAquariumsUseCase implements IGetAquariumsUseCase {
  constructor(private readonly findAquariumsRepository: IFindAquariumsRepository) {}

  async get(data: TGetAquariumsDTO): Promise<Aquarium[] | Aquarium> {
    return await this.findAquariumsRepository.find(data)
  }
}
