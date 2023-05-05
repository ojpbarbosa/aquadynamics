import { SetDeviceStateController } from '@presentation/controllers'
import { RequiredFieldValidation } from '@presentation/validation'
import { SetDeviceStateUseCase } from '@application/use-cases'
import { updateDeviceSqliteRepository } from '@infrastructure/repositories'

export const setDeviceStateControllerFactory = (): SetDeviceStateController => {
  return new SetDeviceStateController(
    new RequiredFieldValidation('state'),
    new SetDeviceStateUseCase(updateDeviceSqliteRepository)
  )
}
