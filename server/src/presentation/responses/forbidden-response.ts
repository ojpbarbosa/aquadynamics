import { IResponse } from '@application/ports/presentation'

export const forbiddenResponse = (message?: string): IResponse => {
  return {
    statusCode: 403,
    body: {
      error: 'Forbidden',
      message
    }
  }
}
