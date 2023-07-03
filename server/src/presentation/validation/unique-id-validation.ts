import { type DefaultError } from '@application/errors'
import { isUniqueId } from '@application/validators'
import { type IValidator } from '@application/ports/presentation'
import { malformattedParameterError, missingParameterError } from '@presentation/errors'

export class UniqueIdValidation implements IValidator {
  constructor(private field?: string) {}

  validate(data: { id: string }): DefaultError | undefined {
    if (!this.field) this.field = 'id'

    if (!data[this.field]) {
      return missingParameterError(this.field)
    }

    if (!isUniqueId(data[this.field])) {
      return malformattedParameterError(this.field)
    }
  }
}
