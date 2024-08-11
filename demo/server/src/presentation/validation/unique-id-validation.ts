import { type DefaultError } from '@application/errors'
import { type IValidator } from '@application/ports/presentation'
import { malformattedParameterError, missingParameterError } from '@presentation/errors'

export class UniqueIdValidation implements IValidator {
  constructor(private isValid: (id: string) => boolean, private field?: string) {}

  validate(data: { id: string }): DefaultError | undefined {
    if (!this.field) this.field = 'id'

    if (!data[this.field]) {
      return missingParameterError(this.field)
    }

    if (!this.isValid(data[this.field])) {
      return malformattedParameterError(this.field)
    }
  }
}
