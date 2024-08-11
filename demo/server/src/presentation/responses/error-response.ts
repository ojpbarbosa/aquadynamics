import { type DefaultError } from '@application/errors'
import { type IResponse } from '@application/ports/presentation'

export const errorResponse = (error: DefaultError): IResponse => {
  return {
    statusCode: error.statusCode,
    body: {
      error: error.error,
      message: error.message
    }
  }
}
