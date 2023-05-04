import { BadRequestError, DefaultError } from '@application/errors'

export const missingParameterError = (parameter: string): DefaultError => {
  return new BadRequestError(`Missing parameter: ${parameter}`)
}
