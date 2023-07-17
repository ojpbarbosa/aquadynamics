import { GetAquariumsController } from '@presentation/controllers/index'
import { GetAquariumsUseCase } from '@application/use-cases'
import { findAquariumsMysqlRepository } from '@infrastructure/repositories'

export const getAquariumsControllerFactory = (): GetAquariumsController => {
  return new GetAquariumsController(new GetAquariumsUseCase(findAquariumsMysqlRepository))
}
