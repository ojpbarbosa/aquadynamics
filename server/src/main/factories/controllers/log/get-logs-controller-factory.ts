import { GetLogsController } from '@presentation/controllers'
import { GetLogsUseCase } from '@application/use-cases'
import { findLogsMysqlRepository } from '@infrastructure/repositories'
import { RequiredFieldValidation } from '@presentation/validation'
import { LogType } from '@core/entities'

export const getLogsControllerFactory = (): GetLogsController => {
  return new GetLogsController(
    new RequiredFieldValidation('type', {
      type: 'string',
      values: Object.values(LogType)
    }),
    new GetLogsUseCase(findLogsMysqlRepository)
  )
}
