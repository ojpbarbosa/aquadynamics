import { type DefaultError } from '@application/errors'
import { type IValidator } from '@application/ports/presentation'
import { missingParameterError, malformattedParameterError } from '@presentation/errors'

export type TRequiredFieldValidationOptions = {
  type?: string
  values?: any | any[]
}

export class RequiredFieldValidation implements IValidator {
  constructor(
    private readonly field: string,
    private readonly options?: TRequiredFieldValidationOptions
  ) {}

  validate(data: object): DefaultError | undefined {
    if (!data[this.field]) {
      return missingParameterError(this.field)
    }

    if (this.options) {
      const { type, values } = this.options

      // eslint-disable-next-line valid-typeof
      if (type && typeof data[this.field] !== type) return malformattedParameterError(this.field)

      if (values && !values.includes(data[this.field]))
        return malformattedParameterError(this.field)
    }
  }
}
