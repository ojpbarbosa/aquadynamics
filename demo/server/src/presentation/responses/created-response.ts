import { type IResponse } from '@application/ports/presentation'

export const createdResponse = (body?: object): IResponse => {
  return {
    statusCode: 201,
    body
  }
}
