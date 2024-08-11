import { GetAquariumsController } from '@presentation/controllers/index'
import { GetAquariumsUseCase } from '@application/use-cases'
import { findAquariumsRepository } from '@infrastructure/repositories'

export const getAquariumsControllerFactory = (): GetAquariumsController => {
  return new GetAquariumsController(new GetAquariumsUseCase(findAquariumsRepository))
}
