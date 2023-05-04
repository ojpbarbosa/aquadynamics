import { CompositeValidation, RequiredFieldValidation } from '@presentation/validation'
import { CreateArticleController } from '@presentation/controllers'
import { CreateArticleUseCase } from '@application/use-cases'
import {
  findArticleBySlugSQLiteRepository,
  saveArticleSQLiteRepository
} from '@infrastructure/repositories'
import { UuidUniqueIdProvider } from '@infrastructure/providers'

export const createArticleControllerFactory = (): CreateArticleController => {
  return new CreateArticleController(
    new CompositeValidation([
      new RequiredFieldValidation('slug'),
      new RequiredFieldValidation('title'),
      new RequiredFieldValidation('body'),
      new RequiredFieldValidation('state')
    ]),
    new CreateArticleUseCase(
      findArticleBySlugSQLiteRepository,
      saveArticleSQLiteRepository,
      new UuidUniqueIdProvider()
    )
  )
}
