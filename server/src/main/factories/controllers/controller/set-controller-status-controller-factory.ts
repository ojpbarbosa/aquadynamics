import { SetControllerStatusController } from '@presentation/controllers'
import { RequiredFieldValidation } from '@presentation/validation'
import { SetControllerStatusUseCase } from '@application/use-cases'
import { updateControllerMysqlRepository } from '@infrastructure/repositories'
import { ControllerStatus } from '@core/entities'

export const setControllerStatusControllerFactory = (): SetControllerStatusController => {
  return new SetControllerStatusController(
    new RequiredFieldValidation('status', {
      type: 'string',
      values: Object.values(ControllerStatus)
    }),
    new SetControllerStatusUseCase(updateControllerMysqlRepository)
  )
}
