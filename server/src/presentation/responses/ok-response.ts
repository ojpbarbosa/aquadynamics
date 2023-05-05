import { type IResponse } from '@application/ports/presentation'

export const okResponse = (body?: object): IResponse => {
  return {
    statusCode: 200,
    body
  }
}
