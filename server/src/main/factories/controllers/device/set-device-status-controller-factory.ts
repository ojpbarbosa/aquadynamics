import { SetDeviceStatusController } from '@presentation/controllers'
import { RequiredFieldValidation } from '@presentation/validation'
import { SetDeviceStatusUseCase } from '@application/use-cases'
import { updateDeviceSqliteRepository } from '@infrastructure/repositories'

export const setDeviceStatusControllerFactory = (): SetDeviceStatusController => {
  return new SetDeviceStatusController(
    new RequiredFieldValidation('status', {
      type: 'string',
      values: ['connected', 'disconnected']
    }),
    new SetDeviceStatusUseCase(updateDeviceSqliteRepository)
  )
}
