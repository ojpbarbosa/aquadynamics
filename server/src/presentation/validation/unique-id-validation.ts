import { DefaultError } from '@application/errors'
import { isUniqueId } from '@application/validators'
import { IValidator } from '@application/ports/presentation'
import { malformattedParameterError, missingParameterError } from '@presentation/errors'

export class UniqueIdValidation implements IValidator {
  validate(data: { id: string }): DefaultError | undefined {
    if (!data.id) {
      return missingParameterError('id')
    }

    if (!isUniqueId(data.id)) {
      return malformattedParameterError('id')
    }
  }
}
