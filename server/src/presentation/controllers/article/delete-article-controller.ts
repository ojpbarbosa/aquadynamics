import { IController, IRequest, IResponse, IValidator } from '@application/ports/presentation'
import { IDeleteArticleUseCase } from '@core/use-cases'
import { errorResponse, noContentResponse } from '@presentation/responses'

export class DeleteArticleController implements IController {
  constructor(
    private readonly validation: IValidator,
    private readonly deleteArticleUseCase: IDeleteArticleUseCase
  ) {}

  async handle(request: IRequest): Promise<IResponse> {
    try {
      const error = this.validation.validate(request.parameters)

      if (error) throw error

      await this.deleteArticleUseCase.delete(request.parameters)

      return noContentResponse()
    } catch (error) {
      return errorResponse(error)
    }
  }
}
