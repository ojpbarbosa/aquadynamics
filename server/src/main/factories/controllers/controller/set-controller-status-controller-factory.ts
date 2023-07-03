import { SetControllerStatusController } from '@presentation/controllers'
import { RequiredFieldValidation } from '@presentation/validation'
import { SetControllerStatusUseCase } from '@application/use-cases'
import { updateControllerMysqlRepository } from '@infrastructure/repositories'
import { controllerStatuses } from '@core/entities'

export const setControllerStatusControllerFactory = (): SetControllerStatusController => {
  return new SetControllerStatusController(
    new RequiredFieldValidation('status', {
      type: 'string',
      values: controllerStatuses
    }),
    new SetControllerStatusUseCase(updateControllerMysqlRepository)
  )
}
