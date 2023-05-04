import { IResponse } from '@application/ports/presentation'

export const unauthorizedResponse = (message?: string): IResponse => {
  return {
    statusCode: 401,
    body: {
      error: 'Unauthorized',
      message
    }
  }
}
