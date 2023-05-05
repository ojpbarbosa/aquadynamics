import { type IRequest, type IResponse } from '.'

export interface IMiddleware {
  handle: (request: IRequest) => Promise<IResponse>
}

