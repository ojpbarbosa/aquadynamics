import { SetControllerStatusController } from '@presentation/controllers/index'
import { RequiredFieldValidation } from '@presentation/validation'
import { SetControllerStatusUseCase } from '@application/use-cases'
import { updateControllerRepository } from '@infrastructure/repositories'
import { controllerStatuses } from '@core/entities'

export const setControllerStatusControllerFactory = (): SetControllerStatusController => {
  return new SetControllerStatusController(
    new RequiredFieldValidation('status', {
      type: 'string',
      values: controllerStatuses
    }),
    new SetControllerStatusUseCase(updateControllerRepository)
  )
}
