import { IController, IRequest, IResponse, IValidator } from '@application/ports/presentation'
import { ISetArticleStateUseCase } from '@core/use-cases'
import { errorResponse, okResponse } from '@presentation/responses'

export class SetArticleStateController implements IController {
  constructor(
    private readonly validator: IValidator,
    private readonly setStateArticleUseCase: ISetArticleStateUseCase
  ) {}

  async handle(request: IRequest): Promise<IResponse> {
    try {
      const error = this.validator.validate({
        id: request.parameters.id,
        state: request.body.state
      })

      if (error) throw error

      return okResponse(
        await this.setStateArticleUseCase.setState({
          id: request.parameters.id,
          state: request.body.state
        })
      )
    } catch (error) {
      return errorResponse(error)
    }
  }
}
