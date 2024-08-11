import { type IResponse } from '@application/ports/presentation'

export const notModifiedResponse = (): IResponse => {
  return {
    statusCode: 304,
    body: {}
  }
}
