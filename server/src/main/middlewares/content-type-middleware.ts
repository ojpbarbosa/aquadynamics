import {
  type NextFunction as Next,
  type Request as HttpRequest,
  type Response as HttpResponse
} from 'express'

export const contentTypeMiddleware = (
  request: HttpRequest,
  response: HttpResponse,
  next: Next
): void => {
  response.type('json')

  next()
}
