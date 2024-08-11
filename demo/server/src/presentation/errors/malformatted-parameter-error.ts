import { BadRequestError, type DefaultError } from '@application/errors'

export const malformattedParameterError = (parameter: string): DefaultError => {
  return new BadRequestError(`Malformatted parameter: ${parameter}`)
}
