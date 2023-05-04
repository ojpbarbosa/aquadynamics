import { IController, IRequest, IResponse } from '@application/ports/presentation'
import { IFindAllArticlesUseCase, IFindArticleBySlugUseCase } from '@core/use-cases'
import { errorResponse, forbiddenResponse, okResponse } from '@presentation/responses'

export class FindArticlesController implements IController {
  constructor(
    private readonly findArticleBySlugUseCase: IFindArticleBySlugUseCase,
    private readonly findAllArticlesUseCase: IFindAllArticlesUseCase
  ) {}

  async handle(request: IRequest): Promise<IResponse> {
    try {
      if (request.query?.slug) {
        const article = await this.findArticleBySlugUseCase.findBySlug({
          slug: request.query.slug
        })

        if (article.state === 'draft' && !request.collaborator)
          return forbiddenResponse('Permission not granted to access this resource')

        return okResponse(article)
      }

      const articles = await this.findAllArticlesUseCase.findAll()

      if (request.query?.state) {
        if (!request.collaborator)
          return forbiddenResponse('Permission not granted to access this resource')

        return okResponse(articles.map((article) => article.state === request.query.state))
      }

      if (request.collaborator) return okResponse(articles)

      return okResponse(articles.filter((article) => article.state === 'published'))
    } catch (error) {
      return errorResponse(error)
    }
  }
}
