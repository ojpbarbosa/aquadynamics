import { type DefaultError } from '@application/errors'

export interface IValidator {
  validate: (data: object) => DefaultError | undefined
}
