import {
  findArticleByIdSQLiteRepository,
  updateArticleSQLiteRepository
} from '@infrastructure/repositories'
import { UniqueIdValidation } from '@presentation/validation'
import { UpdateArticleController } from '@presentation/controllers'
import { UpdateArticleUseCase } from '@application/use-cases'

export const updateArticleControllerFactory = (): UpdateArticleController => {
  return new UpdateArticleController(
    new UniqueIdValidation(),
    new UpdateArticleUseCase(findArticleByIdSQLiteRepository, updateArticleSQLiteRepository)
  )
}
