import { NextFunction as Next, Request as HttpRequest, Response as HttpResponse } from 'express'

export const contentType = (request: HttpRequest, response: HttpResponse, next: Next): void => {
  response.type('json')

  next()
}
