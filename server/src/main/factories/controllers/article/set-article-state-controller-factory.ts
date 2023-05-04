import {
  findArticleByIdSQLiteRepository,
  updateArticleSQLiteRepository
} from '@infrastructure/repositories'
import {
  CompositeValidation,
  RequiredFieldValidation,
  UniqueIdValidation
} from '@presentation/validation'
import { SetArticleStateController } from '@presentation/controllers'
import { SetArticleStateUseCase } from '@application/use-cases'

export const setArticleStateControllerFactory = (): SetArticleStateController => {
  return new SetArticleStateController(
    new CompositeValidation([new UniqueIdValidation(), new RequiredFieldValidation('state')]),
    new SetArticleStateUseCase(findArticleByIdSQLiteRepository, updateArticleSQLiteRepository)
  )
}
