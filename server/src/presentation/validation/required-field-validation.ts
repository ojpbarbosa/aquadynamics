import { type DefaultError } from '@application/errors'
import { type IValidator } from '@application/ports/presentation'
import { missingParameterError } from '@presentation/errors'

export class RequiredFieldValidation implements IValidator {
  constructor(private readonly field: string) {}

  validate(data: object): DefaultError | undefined {
    if (!data[this.field]) {
      return missingParameterError(this.field)
    }
  }
}
