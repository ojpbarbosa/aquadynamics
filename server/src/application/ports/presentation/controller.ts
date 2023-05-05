import { type IRequest, type IResponse } from '.'

export interface IController {
  handle: (request: IRequest) => Promise<IResponse>
}

