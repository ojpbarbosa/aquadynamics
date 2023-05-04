import { IController, IRequest, IResponse, IValidator } from '@application/ports/presentation'
import { IUpdateArticleUseCase } from '@core/use-cases'
import { errorResponse, okResponse } from '@presentation/responses'

export class UpdateArticleController implements IController {
  constructor(
    private readonly validation: IValidator,
    private readonly updateArticleUseCase: IUpdateArticleUseCase
  ) {}

  async handle(request: IRequest): Promise<IResponse> {
    try {
      const error = this.validation.validate({
        id: request.parameters.id
      })

      if (error) throw error

      return okResponse(
        await this.updateArticleUseCase.update({
          id: request.parameters.id,
          ...request.body
        })
      )
    } catch (error) {
      return errorResponse(error)
    }
  }
}
