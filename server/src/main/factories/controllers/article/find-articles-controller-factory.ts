import {
  findAllArticlesSQLiteRepository,
  findArticleBySlugSQLiteRepository
} from '@infrastructure/repositories'
import { FindAllArticlesUseCase, FindArticleBySlugUseCase } from '@application/use-cases'
import { FindArticlesController } from '@presentation/controllers'

export const findArticlesControllerFactory = (): FindArticlesController => {
  return new FindArticlesController(
    new FindArticleBySlugUseCase(findArticleBySlugSQLiteRepository),
    new FindAllArticlesUseCase(findAllArticlesSQLiteRepository)
  )
}
