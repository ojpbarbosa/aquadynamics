import {
  findArticleByIdSQLiteRepository,
  deleteArticleSQLiteRepository
} from '@infrastructure/repositories'
import { UniqueIdValidation } from '@presentation/validation'
import { DeleteArticleController } from '@presentation/controllers'
import { DeleteArticleUseCase } from '@application/use-cases'

export const deleteArticleControllerFactory = (): DeleteArticleController => {
  return new DeleteArticleController(
    new UniqueIdValidation(),
    new DeleteArticleUseCase(findArticleByIdSQLiteRepository, deleteArticleSQLiteRepository)
  )
}
