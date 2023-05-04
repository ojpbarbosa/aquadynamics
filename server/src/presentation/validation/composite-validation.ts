import { DefaultError } from '@application/errors'
import { IValidator } from '@application/ports/presentation'

export class CompositeValidation implements IValidator {
  constructor(private readonly validations: IValidator[]) {}

  validate(data: object): DefaultError | undefined {
    for (const validation of this.validations) {
      const error = validation.validate(data)

      if (error) {
        return error
      }
    }
  }
}
