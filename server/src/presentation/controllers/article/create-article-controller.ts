import { createdResponse, errorResponse, forbiddenResponse } from '@presentation/responses'
import { IController, IRequest, IResponse, IValidator } from '@application/ports/presentation'
import { ICreateArticleUseCase } from '@core/use-cases'

export class CreateArticleController implements IController {
  constructor(
    private readonly validation: IValidator,
    private readonly createArticleUseCase: ICreateArticleUseCase
  ) {}

  async handle(request: IRequest): Promise<IResponse> {
    try {
      const error = this.validation.validate(request.body)

      if (error) throw error

      if (request.collaborator?.role === 'mentor' && request.body.state === 'published')
        return forbiddenResponse('Collaborator is not allowed to perform this action')

      return createdResponse(await this.createArticleUseCase.create(request.body))
    } catch (error) {
      return errorResponse(error)
    }
  }
}
