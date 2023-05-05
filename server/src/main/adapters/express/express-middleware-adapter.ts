import { type DefaultError } from '@application/errors'
import { type IMiddleware } from '@application/ports/presentation'
import {
  type NextFunction as Next,
  type Request as HttpRequest,
  type Response as HttpResponse
} from 'express'

export const adaptMiddleware = (middleware: IMiddleware) => {
  return async (httpRequest: HttpRequest, httpResponse: HttpResponse, next: Next) => {
    const response = await middleware.handle(httpRequest)

    if (response.statusCode === 200) {
      Object.assign(httpRequest, { device: response.body })

      next()
    } else {
      const { error, message } = response.body as DefaultError

      return httpResponse.status(response.statusCode).send({ error, message })
    }
  }
}
