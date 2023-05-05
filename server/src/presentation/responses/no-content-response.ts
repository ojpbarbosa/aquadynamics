import { type IResponse } from '@application/ports/presentation'

export const noContentResponse = (): IResponse => {
  return {
    statusCode: 204,
    body: {}
  }
}
