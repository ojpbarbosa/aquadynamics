import { type DefaultError } from '@application/errors'
import { type IMiddleware } from '@application/ports/presentation'
import {
  type NextFunction as Next,
  type Request as HttpRequest,
  type Response as HttpResponse
} from 'express'

export const adaptMiddleware = (middleware: IMiddleware) => {
  return async (httpRequest: HttpRequest, httpResponse: HttpResponse, next: Next) => {
    const response = await middleware.handle(httpRequest, httpResponse)

    if (response.statusCode >= 200 && response.statusCode < 300) {
      Object.assign(httpRequest, { controller: response.body })

      next()
    } else {
      const { error, message } = response.body as DefaultError

      return httpResponse.status(response.statusCode).send({ error, message })
    }
  }
}
